import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AccountData, useAccountContext } from '../../../accountContextApi/AccountContext';

const AccountsInfoTable: React.FC = () => {
    const { accounts, selectedAccount, setSelectedAccount } = useAccountContext();

    const handleRowClick = (account: AccountData) => {
        setSelectedAccount(account);
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
                        {accounts.map((account) => (
                            <TableRow
                                key={account.id}
                                hover
                                onClick={() => handleRowClick(account)}
                                selected={selectedAccount?.id === account.id}
                                sx={{ '&:nth-of-type(even)': { backgroundColor: '#f2f2f2' } }}
                            >
                                <TableCell>{account.accountNumber}</TableCell>
                                <TableCell>{account.balance}</TableCell>
                                <TableCell>{account.accountType}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default AccountsInfoTable;
