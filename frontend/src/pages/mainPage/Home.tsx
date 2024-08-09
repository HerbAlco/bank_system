import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AccountData, useAccountContext, User } from '../../accountContextApi/AccountContext';
import { Container } from '@mui/system';
import Navbar from '../../components/navbar/Navbar';
import AppBarAndDrawer from '../AppBarAndDrawer';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setAccounts, setSelectedAccount, setIsAuthenticated, setUser, isAuthenticated, selectedAccountId } = useAccountContext();

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      } else {
        setIsAuthenticated(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/user/getcurrentuser`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const userData: User & { accounts: AccountData[] } = response.data;
          const { id, firstName, lastName, email, username, birthDate, address, phoneNumber, role, accounts } = userData;

          setUser({ id, firstName, lastName, email, username, birthDate, address, phoneNumber, role });

          const sortedAccounts = Array.isArray(accounts) ?
            accounts.sort((a, b) => a.id - b.id) :
            [];
          setAccounts(sortedAccounts);

          const account = sortedAccounts.find(acc => acc.id === selectedAccountId);
          setSelectedAccount(account || null);

        } catch (error) {
          console.error("Chyba při načítání uživatelských dat:", error);
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
      <AppBarAndDrawer>
        <Container sx={{ flex: 2 }}>

          <Navbar />
          <Outlet />
        </Container>
      </AppBarAndDrawer>

    </div>
  );
};

export default Home;
