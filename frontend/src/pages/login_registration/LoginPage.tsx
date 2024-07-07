import { useState } from 'react';
import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAccountContext } from '../../accountContextApi/AccountContext';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAccounts, setSelectedAccount } = useAccountContext();

  const fetchAccountData = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/auth/user/getcurrentaccounts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSelectedAccount(response.data[0])
      setAccounts(response.data);

    } catch (error) {
      console.error("Chyba při načítání účtů:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      await fetchAccountData(token);
      navigate("/");

    } catch (error) {
      console.error("Chyba při přihlašování:", error);
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username Address"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
