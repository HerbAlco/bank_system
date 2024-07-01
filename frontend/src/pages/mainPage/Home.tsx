import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import AccountInfoTable from '../../components/accountsTable/AccountInfoTable';
import TransactionsInfoTable from '../../components/transactionsTable/TransactionsInfoTable';


const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    <div style={{ marginTop: '25px', marginLeft: '350px', marginRight: '100px' }}>
      <Header />
      <div style={{ marginBottom: '25px' }}>
        <AccountInfoTable />
      </div>
      <TransactionsInfoTable />
    </div>
  ) : null;

};

export default Home;
