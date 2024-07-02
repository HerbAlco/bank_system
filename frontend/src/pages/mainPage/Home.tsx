import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import TransactionsInfoTable from '../account/transactionsTable/TransactionsInfoTable';
import { Container } from '@mui/system';
import AccountDetails from '../assets/AccountDetails';
import SendPayment from './SendPayment';
import AccountsInfoTable from '../account/accountsTable/AccountInfoTable';

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [showSendPayment, setShowSendPayment] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/authResponse', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Chyba při ověřování tokenu');
        }
        setIsAuthenticated(true);

      } catch (error) {
        console.error('Chyba při ověřování tokenu:', error);
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  return isAuthenticated ? (
    <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'space-between' }}>
      <Container sx={{ flex: 1, marginRight: '20px' }}>
        <AccountDetails selectedAccountId={selectedAccountId} />
      </Container>
      <Container sx={{ flex: 2 }}>
        <Header setShowSendPayment={setShowSendPayment} />
        {showSendPayment ? (
          <SendPayment />
        ) : (
          <>
            <div style={{ marginBottom: '25px' }}>
              <AccountsInfoTable setSelectedAccountId={setSelectedAccountId} />
            </div>
            <TransactionsInfoTable />
          </>
        )}
      </Container>
    </div>
  ) : null;
};

export default Home;
