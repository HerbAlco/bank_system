import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Transaction } from '../pages/mainPage/transactionsTable/types';

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
    children: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(() => {
        const storedAccount = localStorage.getItem('selectedAccount');
        return storedAccount ? JSON.parse(storedAccount) : null;
    });

    useEffect(() => {
        if (selectedAccount) {
            localStorage.setItem('selectedAccount', JSON.stringify(selectedAccount));
        } else {
            localStorage.removeItem('selectedAccount');
        }
    }, [selectedAccount]);

    return (
        <AccountContext.Provider value={{ accounts, selectedAccount, setSelectedAccount, setAccounts }}>
            {children}
        </AccountContext.Provider>
    );
};
