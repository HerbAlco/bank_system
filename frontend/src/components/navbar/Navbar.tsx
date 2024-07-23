import React from 'react';
import { AppBar, Toolbar, MenuItem, Button, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AccountMenu from './DropdownAccountMenu';
import DropdownSendMoney from './DropdownSendMoney';
import DropdownView from './DropdownVeiw';

interface NavbarProps {
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ setView }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" marginBottom={'50px'}>
      <AccountMenu anchorEl={anchorEl} handleClick={handleClick} handleClose={handleClose} />
      <AppBar position="static" sx={{ borderRadius: '10px' }}>
        <Toolbar>
          <MenuItem onClick={() => setView('default')}>Nástěnka</MenuItem>
          <DropdownSendMoney setView={setView} />
          <DropdownView setView={setView} />
          <MenuItem onClick={handleClose}>Platební karty</MenuItem>
          <MenuItem onClick={handleClose}>Šablony</MenuItem>
          <Box sx={{ flexGrow: 1 }} />
          <MenuItem onClick={handleClose}>Informace o účtě</MenuItem>
          <Button color="inherit" onClick={handleClick}>
            <AccountCircle />
          </Button>
        </Toolbar>
      </AppBar>

    </Box>
  );
}

export default Navbar;
