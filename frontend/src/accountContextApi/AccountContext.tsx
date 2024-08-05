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

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    birthDate: string | null;
    address: Address;
    phoneNumber: string | null;
    role: string;
}

interface Address {
    street: string;
    city: string;
    postalCode: string;
    state: string;
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
    user: User | null;
    selectedAccountId: number | null,
    setSelectedAccount: (account: AccountData | null) => void;
    setAccounts: (accounts: AccountData[]) => void;
    setIsAuthenticated: (isAuthenticated: boolean | null) => void;
    setUser: (user: User | null) => void;
    setSelectedAccountId: (selectedAccountId: number | null) => void;
}

const AccountContext = createContext<AccountContextType>({
    accounts: [],
    selectedAccount: null,
    isAuthenticated: null,
    user: null,
    selectedAccountId: null,
    setSelectedAccount: () => { },
    setAccounts: () => { },
    setIsAuthenticated: () => { },
    setUser: () => { },
    setSelectedAccountId: () => { },
});

export const useAccountContext = () => useContext(AccountContext);

interface AccountProviderProps {
    children?: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);



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
        <AccountContext.Provider
            value={{
                accounts,
                selectedAccount,
                isAuthenticated,
                user,
                selectedAccountId,
                setIsAuthenticated: handleSetIsAuthenticated,
                setSelectedAccount: handleSetSelectedAccount,
                setAccounts: handleSetAccounts,
                setUser,
                setSelectedAccountId,
            }}>
            {children}
        </AccountContext.Provider>
    );
};
