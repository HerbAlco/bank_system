import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { format, parseISO } from 'date-fns';
import { columns } from './ColumnTransTable';
import { Transaction } from './types'; // Importujeme nový typ Transaction

const formatDate = (value: string | Date) => {
  const parsedDate = typeof value === 'string' ? parseISO(value) : value;
  return format(parsedDate, 'dd.MM.yyyy HH:mm');
};

export default function TablePaymentInfo() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

        // Zde předpokládáme, že response.data obsahuje seznam účtů s transakcemi
        // a my chceme zobrazit transakce ze všech účtů.
        const allTransactions = response.data.reduce((acc: Transaction[], account: any) => {
          // Sčítáme transakce z každého účtu do jednoho pole
          return acc.concat(account.transactions);
        }, []);

        setTransactions(allTransactions);
      } catch (error) {
        console.error("There was an error fetching the transactions!", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.dateTimeTrans}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.symbol}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.transType}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
