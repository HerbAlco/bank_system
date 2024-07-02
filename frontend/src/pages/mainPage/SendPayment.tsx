import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, TextField, Button, Typography, Grid } from '@mui/material';

interface SendMoneyForm {
    fromAccount: string;
    toAccount: string;
    amount: number;
    note: string;
}

const SendPayment: React.FC = () => {
    const [form, setForm] = useState<SendMoneyForm>({
        fromAccount: '',
        toAccount: '',
        amount: 0,
        note: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token is not available');
            return;
        }

        try {
            await axios.post(
                'http://localhost:8080/api/v1/auth/user/transfer',
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Payment sent successfully');
        } catch (error) {
            console.error('There was an error sending the payment!', error);
        }
    };

    return (
        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'space-between' }}>
            <Container maxWidth='sm'>
                <Paper sx={{ padding: 3, marginTop: 3, width: '100%' }}>
                    <Typography variant="h5" gutterBottom>
                        Tuzemská platba
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Z vašeho účtu"
                                    name="fromAccount"
                                    value={form.fromAccount}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Na číslo účet"
                                    name="toAccount"
                                    value={form.toAccount}
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
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Send
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
