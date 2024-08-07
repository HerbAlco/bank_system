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
import { useNavigate } from 'react-router-dom';

interface SendMoneyForm {
    accountNumber: string;
    toAccountNumber: string;
    amount: number;
    note: string;
    symbol: string;
}

const SendPayment: React.FC = () => {
    const { selectedAccount, accounts, setSelectedAccount, setSelectedAccountId, setIsAuthenticated } = useAccountContext();
    const [form, setForm] = useState<SendMoneyForm>({
        accountNumber: selectedAccount?.accountNumber || '',
        toAccountNumber: '',
        amount: 0,
        note: '',
        symbol: '',
    });
    const navigate = useNavigate();


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
            setSelectedAccountId(selectedAccount.id);
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
        if (form.accountNumber === '') {
            alert('Vyberte svůj účet')
            return;
        }

        const transactionData = {
            ...form,
            transType: 'TRANSFER'
        };

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/auth/account/processTransaction`,
                transactionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsAuthenticated(null);
            navigate("/home/accountsInfo");
            alert('Platba úspěšně odeslána');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    alert(`${error.response.data}`);
                } else if (error.request) {
                    alert('Server neodpovídá');
                } else {
                    alert('Error: ' + error.message);
                }
            } else if (error instanceof Error) {
                alert('Error: ' + error.message);
            } else {
                alert('Neočekávaná chyba');
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
                                        required
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
                                    required
                                    value={form.toAccountNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Částka"
                                    name="amount"
                                    type="tel"
                                    required
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
