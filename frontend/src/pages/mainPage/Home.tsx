import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import SendPayment from './SendPayment';
import TransactionsInfoTable from '../account/transactionsTable/TransactionsInfoTable';
import AccountDetails from './AccountDetails';
import { useAccountContext } from '../../accountContextApi/AccountContext';
import Header from '../../components/header/Header';
import AccountsInfoTable from '../account/accountsTable/AccountInfoTable';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { selectedAccount } = useAccountContext();
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
      case 'sendPayment':
        return <SendPayment selectedAccountNumber={selectedAccount?.accountNumber} />;
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
