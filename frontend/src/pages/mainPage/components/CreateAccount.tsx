import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { AccountType } from '../../../accountContextApi/AccountContext';

export interface BankAccount {
    id?: number;
    name: string;
    accountType: AccountType;
}

const accountTypeTranslations: { [key in AccountType]: string } = {
    [AccountType.CHECKING]: "Běžný účet",
    [AccountType.SAVINGS]: "Spořicí účet",
    [AccountType.BUSINESS]: "Podnikatelský účet",
};

const CreateAccountForm: React.FC = () => {
    const [newAccount, setNewAccount] = useState<BankAccount>({
        name: '',
        accountType: AccountType.CHECKING,
    });
    const navigate = useNavigate();


    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewAccount({ ...newAccount, [name]: value });
    };

    const handleSelectChange = (event: SelectChangeEvent<AccountType>) => {
        setNewAccount({ ...newAccount, accountType: event.target.value as AccountType });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const accountToSubmit = { ...newAccount };
        const token = localStorage.getItem('token');

        if (token) {
            axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/account/create`, accountToSubmit, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .catch(error => {
                    alert(error + ": " + "Chyba při vatváření účtu")
                });
            alert("Váš účet byl úspěšně vytvořen.")
            navigate("/home/accountsInfo");
        } else {
            console.error('No token found. Please log in.');
        }
    };


    return (
        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'space-between' }}>
            <Container maxWidth='sm'>
                <Paper sx={{ padding: 3, marginTop: 3, width: '100%' }}>
                    <Typography variant="h5" gutterBottom>
                        Vytvoření nového účtu
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            required
                            fullWidth
                            margin="normal"
                            id="name"
                            name="name"
                            label="Název účtu"
                            value={newAccount.name}
                            onChange={handleTextFieldChange}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="accountTypeLabel">Typ účtu</InputLabel>
                            <Select
                                labelId="accountTypeLabel"
                                id="accountType"
                                name="accountType"
                                label="Typ účtu"
                                value={newAccount.accountType}
                                onChange={handleSelectChange}
                            >
                                {Object.entries(accountTypeTranslations).map(([key, value]) => (
                                    <MenuItem key={key} value={key as AccountType}>{value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary">
                            Vytvořit účet
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default CreateAccountForm;
