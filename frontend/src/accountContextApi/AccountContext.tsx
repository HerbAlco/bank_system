import React, { useState, createContext, useContext, ReactNode } from 'react';
import { Transaction } from '../pages/mainPage/components/homeAccountsTransactionsTable/types';

export interface AccountData {
    id: number;
    name: string;
    accountNumber: string;
    balance: number;
    accountType: string;
    transactions: Transaction[];
    incomingTransactions: Transaction[];
}

export enum AccountType {
    CHECKING = "CHECKING",
    SAVINGS = "SAVINGS",
    BUSINESS = "BUSINESS",
}

interface AccountContextType {
    accounts: AccountData[];
    selectedAccount: AccountData | null;
    isAuthenticated: boolean | null;
    setSelectedAccount: (account: AccountData | null) => void;
    setAccounts: (accounts: AccountData[]) => void;
    setIsAuthenticated: (isAuthenticated: boolean | null) => void;
}

const AccountContext = createContext<AccountContextType>({
    accounts: [],
    selectedAccount: null,
    isAuthenticated: null,
    setSelectedAccount: () => { },
    setAccounts: () => { },
    setIsAuthenticated: () => { },
});

export const useAccountContext = () => useContext(AccountContext);

interface AccountProviderProps {
    children?: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Přidání isAuthenticated

    const handleSetAccounts = (accounts: AccountData[]) => {
        setAccounts(accounts);
    };

    const handleSetSelectedAccount = (account: AccountData | null) => {
        setSelectedAccount(account);
    };

    const handleSetIsAuthenticated = (isAuthenticated: boolean | null) => {
        setIsAuthenticated(isAuthenticated);
    };

    return (
        <AccountContext.Provider value={{ accounts, selectedAccount, isAuthenticated, setIsAuthenticated: handleSetIsAuthenticated, setSelectedAccount: handleSetSelectedAccount, setAccounts: handleSetAccounts }}>
            {children}
        </AccountContext.Provider>
    );
};
