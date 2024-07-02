import { Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const accountTypeTranslations: { [key: string]: string } = {
    CHECKING: "Běžný účet",
    SAVINGS: "Spořicí účet",
    BUSINESS: "Podnikatelský účet",
};

interface AccountData {
    accountNumber: string;
    balance: number;
    accountType: string;
}

interface AccountDetailsProps {
    selectedAccountId: number | undefined;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ selectedAccountId }) => {
    const [accountData, setAccountData] = useState<AccountData | null>(null);

    useEffect(() => {
        if (selectedAccountId === undefined) return;

        const fetchAccountData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("Token is not available");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/v1/auth/account/get/${selectedAccountId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setAccountData(response.data);
            } catch (error) {
                console.error("There was an error fetching the account data!", error);
            }
        };

        fetchAccountData();
    }, [selectedAccountId]);

    if (!accountData) {
        return (
            <Paper sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Údaje o aktuálním účtě
                </Typography>
                <Typography variant="body1">
                    Žádné údaje o účtu nejsou k dispozici.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ padding: 3, marginTop: 3 }}>
            <Typography variant="h5" gutterBottom>
                Údaje o aktuálním účtě
            </Typography>
            <div>
                <Typography variant="body1"><b>Číslo účtu:</b> {accountData.accountNumber}</Typography>
                <Typography variant="body1"><b>Zůstatek:</b> {accountData.balance}</Typography>
                <Typography variant="body1"><b>Typ účtu:</b> {accountTypeTranslations[accountData.accountType] || accountData.accountType}</Typography>
            </div>
        </Paper>
    );
};

export default AccountDetails;
