import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TablePagination } from '@mui/material';
import { format, isValid, parseISO } from 'date-fns';
import { cs } from 'date-fns/locale';
import { Transaction } from './types';
import { useAccountContext } from '../../../accountContextApi/AccountContext';

interface TransactionsTableProps {
    transactions: Transaction[];
}

const formatDate = (value: string | Date | number) => {
    const parsedDate = typeof value === 'string' ? parseISO(value) : new Date(value);
    if (!isValid(parsedDate)) {
        console.error('Invalid date:', value);
        return 'Invalid Date';
    }
    return format(parsedDate, 'dd.MM.yyyy HH:mm', { locale: cs });
};

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { selectedAccount } = useAccountContext();

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.dateTimeTrans).getTime() - new Date(a.dateTimeTrans).getTime());

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Box
                sx={{
                    padding: 2,
                    backgroundColor: '#f0f0f0',
                    borderBottom: '1px solid #ccc',
                    width: '100%',
                    fontWeight: 'bold'
                }}
            >
                Pohyby na účtech:
            </Box>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Datum</TableCell>
                        <TableCell>Částka</TableCell>
                        <TableCell>Zdrojový účet</TableCell>
                        <TableCell>Protiúčet</TableCell>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Popis</TableCell>
                        <TableCell>Typ transakce</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction, index) => (
                        <TableRow key={`${transaction.id}-${index}`} hover>
                            <TableCell>{transaction.id}</TableCell>
                            <TableCell>{formatDate(transaction.dateTimeTrans)}</TableCell>
                            <TableCell
                                style={{
                                    color: transaction.amount < 0 ? 'red' : 'inherit',
                                    fontWeight: transaction.amount > 0 ? 'bold' : 'normal'
                                }}
                            >
                                {transaction.amount}
                            </TableCell>
                            <TableCell>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 'bold' }}>{selectedAccount?.name}</span>
                                    <span>{transaction.accountNumber}</span>
                                </div>
                            </TableCell>
                            <TableCell>{transaction.toAccountNumber}</TableCell>
                            <TableCell>{transaction.symbol}</TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.transType}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={sortedTransactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default TransactionsTable;
