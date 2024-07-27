import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    SelectChangeEvent,
    FormHelperText
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import { useAccountContext } from '../../../accountContextApi/AccountContext';

interface SendMoneyForm {
    accountNumber: string;
    toAccountNumber: string;
    amount: number;
    note: string;
    symbol: string;
}

const SendPayment: React.FC = () => {
    const { selectedAccount, accounts, setSelectedAccount } = useAccountContext();
    const [form, setForm] = useState<SendMoneyForm>({
        accountNumber: selectedAccount?.accountNumber || '',
        toAccountNumber: '',
        amount: 0,
        note: '',
        symbol: '',
    });

    useEffect(() => {
        if (selectedAccount) {
            setForm(prevForm => ({
                ...prevForm,
                accountNumber: selectedAccount.accountNumber,
            }));
        }
    }, [selectedAccount]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: string }>) => {
        const { name, value } = e.target as HTMLInputElement;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const accountNumber = event.target.value as string;
        setForm({
            ...form,
            accountNumber,
        });

        const selectedAccount = accounts.find(account => account.accountNumber === accountNumber);
        if (selectedAccount) {
            localStorage.setItem('selectedAccountID', String(selectedAccount?.id));
            setSelectedAccount(selectedAccount);
        } else {
            setSelectedAccount(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token is not available');
            return;
        }
        if (form.accountNumber == '') {
            alert('Vyberte svůj účet')
            return;
        }

        const transactionData = {
            ...form,
            transType: 'TRANSFER'
        };

        try {
            await axios.post(
                'http://localhost:8080/api/v1/auth/account/processTransaction',
                transactionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Platba úspěšně odeslána');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const message = error.response.data;
                    alert(`${message}`);
                } else if (error.request) {
                    alert('No response received from server.');
                } else {
                    alert('Error: ' + error.message);
                }
            } else if (error instanceof Error) {
                alert('Error: ' + error.message);
            } else {
                alert('An unexpected error occurred.');
            }
        }


    };



    return (
        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}>
            <Container maxWidth='sm'>
                <Paper sx={{ padding: 3, marginTop: 3, width: '100%' }}>
                    <Typography variant="h5" gutterBottom>
                        Tuzemská platba
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <FormHelperText sx={{ fontSize: '18px' }}>Z účtu:</FormHelperText>
                                    <Select
                                        labelId="account-select-label"
                                        id="simple-select"
                                        value={form.accountNumber}
                                        onChange={handleSelectChange}
                                        IconComponent={(props) => (
                                            <KeyboardArrowDownIcon {...props} />
                                        )}
                                    >
                                        {accounts.map((account) => (
                                            <MenuItem key={account.accountNumber} value={account.accountNumber}>
                                                {account.name} - {account.accountNumber}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Na číslo účtu"
                                    name="toAccountNumber"
                                    value={form.toAccountNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Částka"
                                    name="amount"
                                    type="number"
                                    value={form.amount}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Popis"
                                    name="note"
                                    value={form.note}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Symbol"
                                    name="symbol"
                                    value={form.symbol}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Poslat platbu
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default SendPayment;
