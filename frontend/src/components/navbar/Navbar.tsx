import React from 'react';
import { AppBar, Toolbar, MenuItem, Button, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AccountMenu from './DropdownAccountMenu';
import DropdownSendMoney from './DropdownSendMoney';
import DropdownView from './DropdownVeiw';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <Box display="flex" justifyContent="center" alignItems="center" marginBottom={'50px'}>
      <AccountMenu />
      <AppBar position="static" sx={{ borderRadius: '10px' }}>
        <Toolbar>
          <MenuItem component="a" href='/home/accountsInfo'>Nástěnka</MenuItem>
          <DropdownSendMoney />
          <DropdownView />
          <MenuItem >Platební karty</MenuItem>
          <MenuItem >Šablony</MenuItem>
          <Box sx={{ flexGrow: 1 }} />
          <MenuItem component="a" href='/home/accountDetails'>Informace o účtě</MenuItem>
          <Button color="inherit" onClick={handleClick}>
            <AccountCircle ></AccountCircle>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
