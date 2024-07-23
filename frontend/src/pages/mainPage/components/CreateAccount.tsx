import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

export interface BankAccount {
    id?: number;
    name: string;
    accountType: AccountType;
}

export enum AccountType {
    CHECKING = "CHECKING",
    SAVINGS = "SAVINGS",
    BUSINESS = "BUSINESS",
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
            axios.post('http://localhost:8080/api/v1/auth/account/create', accountToSubmit, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .catch(error => {
                    // Handle error
                    console.error('Error creating account:', error);
                });
        } else {
            console.error('No token found. Please log in.');
        }
    };


    return (
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
    );
};

export default CreateAccountForm;
