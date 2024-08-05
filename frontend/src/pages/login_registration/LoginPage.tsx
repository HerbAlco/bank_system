import { useState } from 'react';
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AccountData, useAccountContext, User } from '../../accountContextApi/AccountContext';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setAccounts, setUser } = useAccountContext();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const fetchAccountData = async (token: string) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/user/getcurrentuser`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const userData: User & { accounts: AccountData[] } = response.data;
      const { id, firstName, lastName, email, username, password, birthDate, address, phoneNumber, role, accounts } = userData;

      setUser({ id, firstName, lastName, email, username, password, birthDate, address, phoneNumber, role });
      setAccounts(accounts);

    } catch (error) {
      console.error("Chyba při načítání účtů:", error);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const normalizedUsername = username.toLowerCase();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/authenticate`, {
        username: normalizedUsername,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      await fetchAccountData(token);
      navigate('/home/accountsInfo');
    } catch (error) {
      setError("Chyba při přihlašování. Zkontrolujte prosím své přihlašovací údaje.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Přihlášení</Typography>
          <Box sx={{ mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email"
              name="Email"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="Heslo"
              label="Heslo"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Přihlásit se'}
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Nejste registrovaní? Registrace</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;