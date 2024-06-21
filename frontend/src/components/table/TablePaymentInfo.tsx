import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'transaction_id' | 'datum' | 'amount' | 'accountNumber' | 'symbol' | 'description' | 'typeTransaction';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string | number) => string | JSX.Element; 
}

const columns: readonly Column[] = [
  { id: 'transaction_id', label: 'ID', minWidth: 10 },
  { id: 'datum', label: 'Datum', minWidth: 150 },
  {
    id: 'amount',
    label: 'Částka',
    minWidth: 170,
    format: (value: string | number) => (typeof value === 'number' ? <b>{value.toLocaleString('en-US')} CZK</b> : `${value}`),
  },
  {
    id: 'accountNumber',
    label: 'Číslo účtu',
    minWidth: 170,
    format: (value: string | number) => value.toString(),
  },
  {
    id: 'symbol',
    label: 'Symbol',
    minWidth: 170,
    format: (value: string | number) => value.toString(),
  },
  {
    id: 'description',
    label: 'Popis',
    minWidth: 170,
    format: (value: string | number) => value.toString(),
  },
  {
    id: 'typeTransaction',
    label: 'Typ transakce',
    minWidth: 170,
    format: (value: string | number) => value.toString(),
  },
];

interface Data {
  transaction_id: string;
  datum: string;
  amount: number;
  accountNumber: string;
  symbol: string;
  description: string;
  typeTransaction: string;
}

function createData(
  transaction_id: string,
  datum: string,
  amount: number,
  accountNumber: string,
  symbol: string,
  description: string,
  typeTransaction: string,
): Data {
  return { transaction_id, datum, amount, accountNumber, symbol, description, typeTransaction };
}

const rows = [
  createData('1', '2024-03-20', 500, '1234567890', 'KS: 0308', 'Platba za nákup', 'Odchozí'),
  createData('2', '2024-03-20', 1200, '0987654321', 'KS: 0308', 'Přijatý platba od zaměstnavatele', 'Příchozí'),
  createData('4', '2024-03-20', 750, '1357924680', 'VS: 2033025413', 'Platba za energie', 'Odchozí'),
  createData('5', '2024-03-20', 3000, '2468013579', 'KS: 0308', 'Přijatý platba od klienta', 'Příchozí'),
  createData('6', '2024-03-20', 150, '9876543210', 'VS: 2033025413', 'Platba za telefon', 'Odchozí'),
  createData('7', '2024-03-20', 1800, '0123456789', 'KS: 0308', 'Přijatý platba od spolubydlícího', 'Příchozí'),
  createData('8', '2024-03-20', 950, '9876543210', 'VS: 2033025413', 'Platba za potraviny', 'Odchozí'),
];

export default function TablePaymentInfo() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.datum}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
