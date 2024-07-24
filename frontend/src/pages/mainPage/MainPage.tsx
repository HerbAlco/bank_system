import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import SendPayment from './components/SendPayment';
import AccountsInfoTable from './components/AccountInfoTable';
import TransactionsInfoTable from './components/transactionsTable/TransactionsInfoTable';
import CreateAccount from './components/CreateAccount'
import Navbar from '../../components/navbar/Navbar';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<string>('default');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  return isAuthenticated ? (
    <div >
      <Container sx={{ flex: 2 }}>
        <Navbar />
        <Outlet />
      </Container>
    </div>
  ) : null;
};

export default Home;
