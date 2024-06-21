import React from 'react';
import { Transaction } from './Types';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <div>
      <div>Date: {transaction.date}</div>
      <div>Amount: {transaction.amount} CZK</div>
      <div>Description: {transaction.description}</div>
      {/* Add more details as needed */}
    </div>
  );
}

export default TransactionItem;