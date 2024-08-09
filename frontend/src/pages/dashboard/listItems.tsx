import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';

export const MainListItems = () => {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <ListItemButton onClick={() => navigate('/dashboard')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Přehled" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/orders')}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Objednávky" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/customers')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Lidé" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/reports')}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Novinky" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/home/accountsInfo')}>
                <ListItemIcon>
                    <AccountBalanceRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Bankovní účet" />
            </ListItemButton>
        </React.Fragment>
    );
};

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);