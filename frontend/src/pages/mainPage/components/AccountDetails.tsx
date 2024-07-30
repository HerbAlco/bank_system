import { Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAccountContext } from '../../../accountContextApi/AccountContext';

const accountTypeTranslations: { [key: string]: string } = {
    CHECKING: "Běžný účet",
    SAVINGS: "Spořicí účet",
    BUSINESS: "Podnikatelský účet",
};

const AccountDetails: React.FC = () => {
    const { selectedAccount } = useAccountContext();

    if (!selectedAccount) {
        return (
            <Paper sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Údaje o aktuálním účtě
                </Typography>
                <Typography variant="body1">
                    Vyberte účet
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
                <Typography variant="body1"><b>Název účtu:</b> {selectedAccount.name}</Typography>
                <Typography variant="body1"><b>Číslo účtu:</b> {selectedAccount.accountNumber}</Typography>
                <Typography variant="body1"><b>Zůstatek:</b> {selectedAccount.balance.toLocaleString('cs', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
                <Typography variant="body1"><b>Typ účtu:</b> {accountTypeTranslations[selectedAccount.accountType] || selectedAccount.accountType}</Typography>
            </div>
        </Paper>
    );
};

export default AccountDetails;
