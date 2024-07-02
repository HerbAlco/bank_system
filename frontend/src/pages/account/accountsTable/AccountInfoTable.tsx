import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface AccountsInfoTableProps {
    setSelectedAccountId: React.Dispatch<React.SetStateAction<number | null>>;
}

interface AccountData {
    id: number;
    accountNumber: string;
    balance: number;
    accountType: string;
}

const AccountsInfoTable: React.FC<AccountsInfoTableProps> = ({ setSelectedAccountId }) => {
    const [rows, setRows] = useState<AccountData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("Token is not available");
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/v1/auth/user/getcurrentaccounts', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data: AccountData[] = response.data.map((account: any) => ({
                    id: account.id,
                    accountNumber: account.accountNumber,
                    balance: account.balance,
                    accountType: account.accountType,
                }));

                setRows(data);
            } catch (error) {
                console.error("There was an error fetching the accounts!", error);
            }
        };

        fetchData();
    }, []);

    const handleRowClick = (id: number) => {
        setSelectedAccountId(id);
        // Optionally, you can navigate to another page or perform other actions here
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Číslo účtu</TableCell>
                            <TableCell>Zůstatek</TableCell>
                            <TableCell>Typ účtu</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover key={row.id} onClick={() => handleRowClick(row.id)} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f2f2f2' } }}>
                                <TableCell>{row.accountNumber}</TableCell>
                                <TableCell>{row.balance}</TableCell>
                                <TableCell>{row.accountType}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default AccountsInfoTable;
