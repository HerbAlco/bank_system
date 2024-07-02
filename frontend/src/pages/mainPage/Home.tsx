import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import TransactionsInfoTable from '../account/transactionsTable/TransactionsInfoTable';
import { Container } from '@mui/system';
import SendPayment from './SendPayment';
import AccountsInfoTable from '../account/accountsTable/AccountInfoTable';
import AccountDetails from './AccountDetails';

interface AccountData {
  id: number;
  accountNumber: string;
  balance: number;
  accountType: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(null); // Changed to null
  const [view, setView] = useState<string>('default');
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

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

  const renderView = () => {
    switch (view) {
      case 'sendPayment':
        return <SendPayment selectedAccountNumber={selectedAccount?.accountNumber} />;
      case 'default':
      default:
        return (
          <>
            <div style={{ marginBottom: '25px' }}>
              <AccountsInfoTable setSelectedAccount={setSelectedAccount} isInitialLoad={isInitialLoad} setIsInitialLoad={setIsInitialLoad} />
            </div>
            <TransactionsInfoTable selectedAccountId={selectedAccount?.id} />
          </>
        );
    }
  };

  return isAuthenticated ? (
    <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'space-between' }}>
      <Container sx={{ flex: 1, marginRight: '20px' }}>
        <AccountDetails selectedAccountId={selectedAccount?.id} />
      </Container>
      <Container sx={{ flex: 2 }}>
        <Header setView={setView} />
        {renderView()}
      </Container>
    </div>
  ) : null;
};

export default Home;
