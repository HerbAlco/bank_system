import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import SendPayment from './components/SendPayment';
import Header from '../../components/navbar/Navbar';
import AccountsInfoTable from './components/AccountInfoTable';
import TransactionsInfoTable from './components/transactionsTable/TransactionsInfoTable';
import CreateAccount from './components/CreateAccount'

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

  const renderView = () => {
    switch (view) {
      case 'createAccount':
        return <CreateAccount />;
      case 'sendPayment':
        return <SendPayment />;
      case 'default':
      default:
        return (
          <>
            <div style={{ marginBottom: '25px' }}>
              <AccountsInfoTable />
            </div>
            <TransactionsInfoTable />
          </>
        );
    }
  };

  return isAuthenticated ? (
    <div >
      <Container sx={{ flex: 2 }}>
        <Header setView={setView} />
        {renderView()}
      </Container>
    </div>
  ) : null;
};

export default Home;
