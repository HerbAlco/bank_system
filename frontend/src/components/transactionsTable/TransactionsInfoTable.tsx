import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper } from '@mui/material';
import { Transaction } from './types';
import TransactionTable from './TransactionTable';

export default function AccountsInfoTable() {
  const [rows, setRows] = useState<Transaction[]>([]);

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

        const data: Transaction[] = response.data.flatMap((account: any) =>
          account.transactions.map((transaction: any) => ({
            id: transaction.id,
            dateTimeTrans: transaction.dateTimeTrans,
            amount: transaction.amount,
            symbol: transaction.symbol,
            description: transaction.note,
            transType: transaction.transType
          }))
        );

        setRows(data);
      } catch (error) {
        console.error("There was an error fetching the accounts!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: 15 }}>
      <TransactionTable transactions={rows} />
    </Paper>
  );
}
