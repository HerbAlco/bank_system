import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { useAccountContext } from '../../accountContextApi/AccountContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { setAccounts, setSelectedAccount } = useAccountContext();

  useEffect(() => {

    const fetchAccounts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        /* navigate('/login'); */
      } else {
        setIsAuthenticated(true);
        try {
          const response = await axios.get("http://localhost:8080/api/v1/auth/user/getcurrentaccounts", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const accounts = response.data.sort((a: { id: number }, b: { id: number }) => {
            return a.id - b.id;
          });
          setAccounts(accounts);

          const selectedAccountID = localStorage.getItem('selectedAccountID');
          const id = selectedAccountID ? parseInt(selectedAccountID, 10) : null;

          const account = accounts.find((acc: { id: number | null }) => acc.id === id);
          if (account) {
            setSelectedAccount(account);
          } else {
            setSelectedAccount(null);
          }

        } catch (error) {
          console.error("Chyba při načítání účtů:", error);
        }
      }
    };




    fetchAccounts();
  }, [navigate]);

  /* if (isAuthenticated === null) {
    return <div>Loading...</div>;
  } */

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
