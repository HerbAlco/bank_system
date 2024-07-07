import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AccountData {
    id: number;
    name: string;
    accountNumber: string;
    balance: number;
    accountType: string;
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
    const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(null);

    return (
        <AccountContext.Provider value={{ accounts, selectedAccount, setSelectedAccount, setAccounts }}>
            {children}
        </AccountContext.Provider>
    );
};
