import React, { MouseEventHandler, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { AccountType, useAccountContext } from '../../../accountContextApi/AccountContext';
import { se } from 'date-fns/locale';

const accountTypeTranslations: { [key: string]: string } = {
    CHECKING: "Běžný účet",
    SAVINGS: "Spořicí účet",
    BUSINESS: "Podnikatelský účet",
};

const AccountDetails: React.FC = () => {
    const { selectedAccount } = useAccountContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [newName, setNewName] = useState(selectedAccount?.name || null);
    const [newAccountType, setNewAccountType] = useState<string | "">(selectedAccount?.accountType || "");

    const handleClickOpen = () => {
        if (selectedAccount != null)
            setNewName(selectedAccount?.name);

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectChange = (event: SelectChangeEvent<string | "">) => {
        setNewAccountType(event.target.value as string | "");
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        if (token && selectedAccount != null) {
            axios.put(`${process.env.REACT_APP_API_URL}/api/v1/auth/account/update/` + selectedAccount.id, {
                name: newName,
                accountType: newAccountType,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    alert("Váš účet byl úspěšně upraven.");
                    navigate("/home/accountsInfo");
                })
                .catch(error => {
                    alert(error + ": " + "Chyba při úpravě účtu");
                });
        } else {
            console.error('No token found. Please log in.');
        }

        handleClose();
    };


    if (!selectedAccount) {
        return (
            <Container maxWidth='sm'>
                <Paper sx={{ padding: 3, marginTop: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Údaje o aktuálním účtě
                    </Typography>
                    <Typography variant="body1">
                        Vyberte účet
                    </Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth='sm'>
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
                <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ marginTop: 2 }}>
                    Upravit účet
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Upravit údaje účtu</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Změňte název a typ účtu.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Název účtu"
                            type="text"
                            fullWidth
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="accountTypeLabel">Typ účtu</InputLabel>
                            <Select
                                labelId="accountTypeLabel"
                                id="accountType"
                                name="accountType"
                                label="Typ účtu"
                                value={newAccountType}
                                onChange={handleSelectChange}
                            >
                                {Object.entries(accountTypeTranslations).map(([key, value]) => (
                                    <MenuItem key={key} value={key as AccountType}>{value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose} color="error">
                            Zrušit
                        </Button>
                        <Button variant="contained" onClick={handleSubmit} color="success" content='a' href='home/accountsInfo'>
                            Uložit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    );
};

export default AccountDetails;

