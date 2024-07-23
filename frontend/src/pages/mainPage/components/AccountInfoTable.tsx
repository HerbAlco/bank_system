import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AccountData, useAccountContext } from '../../../accountContextApi/AccountContext';
import axios from 'axios';

const accountTypeTranslations: { [key: string]: string } = {
    CHECKING: "Běžný účet",
    SAVINGS: "Spořicí účet",
    BUSINESS: "Podnikatelský účet",
};

const AccountsInfoTable: React.FC = () => {
    const { accounts, selectedAccount, setSelectedAccount, setAccounts } = useAccountContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleRowClick = (account: AccountData) => {
        setSelectedAccount(account);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            const token = localStorage.getItem("token");

            if (!token) {
                setError("Token is not available");
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get("http://localhost:8080/api/v1/auth/user/getcurrentaccounts", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAccounts(response.data);
            } catch (error) {
                console.error("Chyba při načítání účtů:", error);
                setError("Chyba při načítání účtů");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600, position: 'relative' }}>
                <Box
                    sx={{
                        padding: 2,
                        backgroundColor: '#f0f0f0',
                        borderBottom: '1px solid #ccc',
                        width: '100%',
                        fontWeight: 'bold'
                    }}
                >
                    Zůstatky na účtech:
                </Box>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Číslo účtu</TableCell>
                            <TableCell>Zůstatek</TableCell>
                            <TableCell>Typ účtu</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={3}>Načítám účty...</TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={3}>Chyba: {error}</TableCell>
                            </TableRow>
                        ) : (
                            accounts.map((account) => (
                                <TableRow
                                    key={account.id}
                                    hover
                                    onClick={() => handleRowClick(account)}
                                    selected={selectedAccount?.id === account.id}
                                >
                                    <TableCell>{account.accountNumber}</TableCell>
                                    <TableCell
                                        style={{
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {account.balance}
                                    </TableCell>
                                    <TableCell>
                                        {accountTypeTranslations[account.accountType] || account.accountType}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default AccountsInfoTable;