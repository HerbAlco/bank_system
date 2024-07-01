import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { format, isValid, parseISO } from 'date-fns';
import { Transaction } from './types';
import { cs } from 'date-fns/locale';


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
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Datum</TableCell>
                        <TableCell>Částka</TableCell>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Popis</TableCell>
                        <TableCell>Typ transakce</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f2f2f2' } }}>
                            <TableCell>{transaction.id}</TableCell>
                            <TableCell>{formatDate(transaction.dateTimeTrans)}</TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                            <TableCell>{transaction.symbol}</TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.transType}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TransactionsTable;
