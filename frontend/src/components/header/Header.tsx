import * as React from 'react';
import { AppBar, Toolbar, MenuItem, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DropdownSendMoney from '../../assets/DropdownSendMoney';
import DropdownView from '../../assets/DropdownVeiw';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ mt: 10, borderRadius: '10px' }}>
      <Toolbar>
        <MenuItem onClick={handleClose}>Nástěnka</MenuItem>
        <DropdownSendMoney />
        <DropdownView />
        <MenuItem onClick={handleClose}>Platební karty</MenuItem>
        <MenuItem onClick={handleClose}>Šablony</MenuItem>
        <Box sx={{ flexGrow: 1 }} />
        <MenuItem component={Link} to="/account" sx={{ mr: 2 }}>
          Informace o účtě
        </MenuItem>
        <Button color="inherit"><AccountCircle /></Button>
      </Toolbar>
    </AppBar>
  );
}