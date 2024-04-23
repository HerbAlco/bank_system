import { AppBar, Box, Button, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    console.log('Odhlášení uživatele');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleItemClick = (item: string) => {
    if (item === 'Odhlásit se') {
      handleLogout();
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Bankovní systém
          </Typography>
          <Box>
            {isLoggedIn ? (
              <Button key="Odhlásit se" sx={{ color: '#fff' }} onClick={() => handleItemClick('Odhlásit se')}>
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

export default Navbar;
