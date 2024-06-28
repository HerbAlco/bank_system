import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Data } from './types';

const columns = [
    { id: 'accountNumber', label: 'Číslo účtu', minWidth: 200 },
    { id: 'balance', label: 'Zůstatek', minWidth: 100 },
    { id: 'accountType', label: 'Typ účtu', minWidth: 100 },
];

export default function AccountsInfoTable() {
    const [rows, setRows] = useState<Data[]>([]);

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

                // Zpracování dat z odpovědi
                const data: Data[] = response.data.map((account: any) => ({
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

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align="left"
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover key={row.id}>
                                <TableCell align="left">{row.accountNumber}</TableCell>
                                <TableCell align="left">{row.balance}</TableCell>
                                <TableCell align="left">{row.accountType}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
