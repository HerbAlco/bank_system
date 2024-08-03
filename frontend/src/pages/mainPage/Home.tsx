import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { AccountData, useAccountContext } from '../../accountContextApi/AccountContext';


const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { setAccounts, setSelectedAccount } = useAccountContext();

  const lastLocation = useRef<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      } else {
        setIsAuthenticated(true);
        try {
          const response = await axios.get<AccountData[]>(`${process.env.REACT_APP_API_URL}/api/v1/auth/user/getcurrentaccounts`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          console.log('API response data:', response.data);

          const accounts = Array.isArray(response.data) ?
            response.data.sort((a, b) => a.id - b.id) :
            [];

          setAccounts(accounts);

          const selectedAccountID = localStorage.getItem('selectedAccountID');
          const id = selectedAccountID ? parseInt(selectedAccountID, 10) : null;

          const account = accounts.find(acc => acc.id === id);
          setSelectedAccount(account || null);

        } catch (error) {
          console.error("Chyba při načítání účtů:", error);
        }
      }
    };

    fetchAccounts();

    if (lastLocation.current !== location.pathname) {
      fetchAccounts();
      lastLocation.current = location.pathname;
    }

    return () => {
      lastLocation.current = location.pathname;
    };

  }, [location.pathname, navigate, setAccounts, setSelectedAccount]);

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
