import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper } from '@mui/material';
import TransactionTable from './TransactionTable';
import { useAccountContext } from '../../../accountContextApi/AccountContext';
import { Transaction } from './types';

export const getTransTypeDescription = (transType: string): string => {
  const transTypeMap: { [key: string]: string } = {
    KART_PAYMENT: "Platba kartou",
    TRANSFER: "Platba převodem",
    WITHDRAW: "Výběr",
    DEPOSIT: "Vklad"
  };
  return transTypeMap[transType] || transType;
};

const TransactionsInfoTable: React.FC = () => {
  const [rows, setRows] = useState<Transaction[]>([]);
  const { selectedAccount } = useAccountContext();

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAccount?.id) {
        setRows([]);
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token is not available");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/account/get/${selectedAccount.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const transactionsData = response.data.transactions.map((transaction: any) => ({
          id: transaction.id,
          dateTimeTrans: transaction.dateTimeTrans,
          amount: transaction.amount,
          symbol: transaction.symbol,
          description: transaction.note,
          transType: getTransTypeDescription(transaction.transType)
        }));

        const incomingTransactionsData = response.data.incomingTransactions.map((transaction: any) => ({
          id: transaction.id,
          dateTimeTrans: transaction.dateTimeTrans,
          amount: transaction.amount,
          symbol: transaction.symbol,
          description: transaction.note,
          transType: getTransTypeDescription(transaction.transType)
        }));

        const allTransactions = [...transactionsData, ...incomingTransactionsData];

        setRows(allTransactions);

      } catch (error) {
        console.error("There was an error fetching the transactions!", error);
      }
    };

    fetchData();
  }, [selectedAccount]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: 15 }}>
      <TransactionTable transactions={rows} />
    </Paper>
  );
};

export default TransactionsInfoTable;
