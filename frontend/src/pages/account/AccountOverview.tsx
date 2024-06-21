import React from 'react';

interface AccountOverviewProps {
  availableBalance: number;
  currentBalance: number;
  blockedAmount: number;
}

const AccountOverview: React.FC<AccountOverviewProps> = ({ availableBalance, currentBalance, blockedAmount }) => {
  return (
    <div>
      <h2>Account Overview</h2>
      <div>Available balance: {availableBalance} CZK</div>
      <div>Current balance: {currentBalance} CZK</div>
      <div>Blocked amount: {blockedAmount} CZK</div>
    </div>
  );
}

export default AccountOverview;