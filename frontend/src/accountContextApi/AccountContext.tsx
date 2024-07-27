import React, { useState, createContext, useContext, ReactNode } from 'react';
import { Transaction } from '../pages/mainPage/components/transactionsTable/types';

export interface AccountData {
    id: number;
    name: string;
    accountNumber: string;
    balance: number;
    accountType: string;
    transactions: Transaction[];
    incomingTransactions: Transaction[];
}

interface AccountContextType {
    accounts: AccountData[];
    selectedAccount: AccountData | null;
    setSelectedAccount: (account: AccountData | null) => void;
    setAccounts: (accounts: AccountData[]) => void;
}

const AccountContext = createContext<AccountContextType>({
    accounts: [],
    selectedAccount: null,
    setSelectedAccount: () => { },
    setAccounts: () => { },
});

export const useAccountContext = () => useContext(AccountContext);

interface AccountProviderProps {
    children?: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(null);

    const handleSetAccounts = (accounts: AccountData[]) => {
        console.log("Setting accounts:", accounts);
        setAccounts(accounts);
    };

    const handleSetSelectedAccount = (account: AccountData | null) => {
        console.log("Setting selected account:", account);
        setSelectedAccount(account);
    };


    return (
        <AccountContext.Provider value={{ accounts, selectedAccount, setSelectedAccount: handleSetSelectedAccount, setAccounts: handleSetAccounts }}>
            {children}
        </AccountContext.Provider>
    );
};