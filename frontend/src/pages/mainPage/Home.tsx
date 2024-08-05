import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { useAccountContext } from '../../accountContextApi/AccountContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setAccounts, setSelectedAccount, setIsAuthenticated, isAuthenticated, selectedAccountId } = useAccountContext();

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      } else {
        setIsAuthenticated(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/user/getcurrentaccounts`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const accounts = Array.isArray(response.data) ?
            response.data.sort((a: { id: number }, b: { id: number }) => a.id - b.id) :
            [];

          setAccounts(accounts);

          const account = accounts.find((acc: { id: number | null }) => acc.id === selectedAccountId);
          setSelectedAccount(account || null);

        } catch (error) {
          console.error("Chyba při načítání účtů:", error);
        }
      }
    };
    if (isAuthenticated === null) {
      fetchAccounts();
    }

  }, [navigate, setAccounts, setSelectedAccount]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container sx={{ flex: 2 }}>
        <Navbar />
        <Outlet />
      </Container>
    </div>
  );
};

export default Home;
