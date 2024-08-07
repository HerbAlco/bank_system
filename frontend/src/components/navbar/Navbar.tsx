import React from 'react';
import { AppBar, Toolbar, MenuItem, Box } from '@mui/material';
import AccountMenu from './DropdownAccountMenu';
import DropdownSendMoney from './DropdownSendMoney';
import DropdownView from './DropdownVeiw';
import { useNavigate } from 'react-router-dom';
import { useAccountContext } from '../../accountContextApi/AccountContext';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { setIsAuthenticated, user, setSelectedAccount, setSelectedAccountId } = useAccountContext();


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavigation = (path: string) => () => {
    setIsAuthenticated(null);
    navigate(path);
  };

  const handleBulletinBoard = (path: string) => () => {
    setSelectedAccount(null);
    setSelectedAccountId(null);
    setIsAuthenticated(null);
    navigate(path);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" marginBottom={'50px'}>
      <AccountMenu />
      <AppBar position="static" sx={{ borderRadius: '10px' }}>
        <Toolbar>
          <MenuItem onClick={handleBulletinBoard('/home/accountsInfo')}>Nástěnka</MenuItem>
          <DropdownSendMoney />
          <DropdownView />
          <MenuItem >Platební karty</MenuItem>
          <MenuItem >Šablony</MenuItem>
          <Box sx={{ flexGrow: 1 }} />
          <MenuItem onClick={handleNavigation('/home/accountDetails')}>Informace o účtě</MenuItem>
          <MenuItem onClick={handleNavigation('/home/userDetails')}>
            {user?.lastName} {user?.firstName}
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
