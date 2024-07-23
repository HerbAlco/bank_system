import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper } from '@mui/material';
import TransactionTable from './TransactionTable';
import { Transaction } from './types';
import { useAccountContext } from '../../../../accountContextApi/AccountContext';


export const getTransTypeDescription = (transType: string): string => {
  const transTypeMap: { [key: string]: string } = {
    KART_PAYMENT: "Platba kartou",
    TRANSFER: "Platba převodem",
    WITHDRAW: "Výběr",
    DEPOSIT: "Vklad"
  };
  return transTypeMap[transType] || transType;
};

const fetchTransactions = async (accountId: number, token: string): Promise<Transaction[]> => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/auth/account/get/${accountId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const transactionsData = response.data.transactions.map((transaction: any) => ({
      id: transaction.id,
      dateTimeTrans: transaction.dateTimeTrans,
      amount: (transaction.transType === 'KART_PAYMENT' || transaction.transType === 'TRANSFER' || transaction.transType === 'WITHDRAW') ? -transaction.amount : transaction.amount,
      symbol: transaction.symbol,
      description: transaction.note,
      transType: getTransTypeDescription(transaction.transType),
      accountNumber: transaction.accountNumber,
      toAccountNumber: transaction.toAccountNumber
    }));

    const incomingTransactionsData = response.data.incomingTransactions.map((transaction: any) => ({
      id: transaction.id,
      dateTimeTrans: transaction.dateTimeTrans,
      amount: transaction.amount,
      symbol: transaction.symbol,
      description: transaction.note,
      transType: getTransTypeDescription(transaction.transType),
      accountNumber: transaction.accountNumber,
      toAccountNumber: transaction.toAccountNumber
    }));

    return [...transactionsData, ...incomingTransactionsData];

  } catch (error) {
    console.error("There was an error fetching the transactions!", error);
    return [];
  }
};

const TransactionsInfoTable: React.FC = () => {
  const [rows, setRows] = useState<Transaction[]>([]);
  const { accounts, selectedAccount } = useAccountContext();

  useEffect(() => {
    const fetchData = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token is not available");
        return;
      }

      try {
        setRows([]);
        const allTransactions: Transaction[] = [];

        if (!selectedAccount?.id) {
          for (const account of accounts) {
            const transactions = await fetchTransactions(account.id, token);
            allTransactions.push(...transactions);
          }
        } else {
          const transactions = await fetchTransactions(selectedAccount.id, token);
          allTransactions.push(...transactions);
        }

        setRows(allTransactions);

      } catch (error) {
        console.error("There was an error fetching the transactions!", error);
        setRows([]);
      }
    };

    fetchData();
  }, [selectedAccount, accounts]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: 15 }}>
      <TransactionTable transactions={rows} />
    </Paper>
  );
};

export default TransactionsInfoTable;
