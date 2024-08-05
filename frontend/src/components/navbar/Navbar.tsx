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
  const { setIsAuthenticated, user } = useAccountContext();


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavigation = (path: string) => () => {
    setIsAuthenticated(null);
    navigate(path);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" marginBottom={'50px'}>
      <AccountMenu />
      <AppBar position="static" sx={{ borderRadius: '10px' }}>
        <Toolbar>
          <MenuItem onClick={handleNavigation('/home/accountsInfo')}>Nástěnka</MenuItem>
          <DropdownSendMoney />
          <DropdownView />
          <MenuItem >Platební karty</MenuItem>
          <MenuItem >Šablony</MenuItem>
          <Box sx={{ flexGrow: 1 }} />
          <MenuItem onClick={handleNavigation('/home/accountDetails')}>Informace o účtě</MenuItem>
          <div>
            <div>
              {user?.firstName} {user?.lastName}
            </div>
            <MenuItem onClick={handleNavigation('/home/userDetails')}>
              Nastavení
            </MenuItem>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
