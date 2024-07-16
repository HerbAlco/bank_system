import { AppBar, Box, Button, CssBaseline, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAccountContext } from '../../accountContextApi/AccountContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;
  const { setSelectedAccount } = useAccountContext();


  const handleLogout = () => {
    console.log('Odhlášení uživatele');
    setSelectedAccount(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Bankovní systém
          </Typography>
          <Box>
            {isLoggedIn ? (
              <Button key="Odhlásit se" sx={{ color: '#fff' }} onClick={() => handleLogout()}>
                Odhlásit se
              </Button>
            ) : (
              <Button key="Přihlásit se" sx={{ color: '#fff' }} onClick={() => navigate('/login')}>
                Přihlásit se
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
        </Typography>
      </Box>
    </Box>
  );
}

export default Header;
