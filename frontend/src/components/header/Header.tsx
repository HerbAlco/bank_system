import { AppBar, Box, Button, CssBaseline, Toolbar, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAccountContext } from '../../accountContextApi/AccountContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token') !== null;
  const { setSelectedAccount, setSelectedAccountId } = useAccountContext();

  const handleLogout = () => {
    console.log('Odhlášení uživatele');
    setSelectedAccount(null);
    setSelectedAccountId(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

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
            {isLoggedIn && !isLoginPage && !isRegisterPage ? (
              <Button key="Odhlásit se" sx={{ color: '#fff' }} onClick={handleLogout}>
                Odhlásit se
              </Button>
            ) : (
              isLoginPage ? (
                <Button key="Registrace" sx={{ color: '#fff' }} onClick={() => handleNavigation('/register')}>
                  Registrace
                </Button>
              ) : (
                <Button key="Přihlásit se" sx={{ color: '#fff' }} onClick={() => handleNavigation('/login')}>
                  Přihlásit se
                </Button>
              ))}
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