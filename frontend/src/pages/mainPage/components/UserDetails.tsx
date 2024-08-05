import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { useAccountContext, User } from '../../../accountContextApi/AccountContext';
import { useNavigate } from 'react-router-dom';

const UserDetails: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAccountContext();

    const { control, handleSubmit, setValue, formState: { errors } } = useForm<User>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            birthDate: '',
            address: { street: '', city: '', postalCode: '', state: '' },
            phoneNumber: '',
        }
    });

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                for (const [key, value] of Object.entries(user)) {
                    setValue(key as keyof User, value);
                }
            }
        }
        fetchUser();
    }, [setValue, user]);

    const onSubmit = async (data: User) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/auth/user/update/${data.id}`, data);
            alert('User details updated successfully!');
            navigate("/home/userDetails");
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Vaše osobní údaje
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Jméno"
                                    fullWidth
                                    error={!!errors.firstName}
                                    helperText={errors.firstName ? errors.firstName.message : ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Příjmení"
                                    fullWidth
                                    error={!!errors.lastName}
                                    helperText={errors.lastName ? errors.lastName.message : ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="birthDate"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Datum narození"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    error={!!errors.birthDate}
                                    helperText={errors.birthDate ? errors.birthDate.message : ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="address.city"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Město"
                                    fullWidth
                                    error={!!errors.address?.city}
                                    helperText={errors.address?.city ? errors.address.city.message : ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="address.postalCode"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="PSČ"
                                    fullWidth
                                    error={!!errors.address?.postalCode}
                                    helperText={errors.address?.postalCode ? errors.address.postalCode.message : ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="address.street"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Ulice"
                                    fullWidth
                                    error={!!errors.address?.street}
                                    helperText={errors.address?.street ? errors.address.street.message : ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="address.state"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Stát"
                                    fullWidth
                                    error={!!errors.address?.state}
                                    helperText={errors.address?.state ? errors.address.state.message : ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Tel. číslo"
                                    fullWidth
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Uložit změny
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default UserDetails;