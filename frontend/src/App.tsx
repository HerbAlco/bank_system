import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AccountProvider, useAccountContext } from './accountContextApi/AccountContext';
import Header from './components/header/Header';
import LoginPage from './pages/login_registration/LoginPage';
import RegistrationPage from './pages/login_registration/RegistrationPage';
import ProtectedRoute from './ProtectedRoute';
import CreateAccount from './pages/mainPage/components/CreateAccount';
import AccountsInfoTable from './pages/mainPage/components/AccountInfoTable';
import SendPayment from './pages/mainPage/components/SendPayment';
import Home from './pages/mainPage/Home';
import AccountDetails from './pages/mainPage/components/AccountDetails';

const AppContent = () => {
  const navigate = useNavigate();
  const { setAccounts } = useAccountContext();

  const fetchAccountData = async (token: string | null) => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/auth/user/getcurrentaccounts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAccounts(response.data);
    } catch (error) {
      console.error("Chyba při načítání účtů:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && !window.location.pathname.startsWith("/register")) {
      navigate("/login");
      return;
    }

    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:8080/api/v1/auth/authResponse", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await fetchAccountData(token);
      } catch (error) {
        if (!window.location.pathname.startsWith("/register")) {
          navigate("/login");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />}>
            <Route path="createAccount" element={<CreateAccount />} />
            <Route path="accountInfo" element={<AccountsInfoTable />} />
            <Route path="payment" element={<SendPayment />} />
            <Route path='accountDetails' element={<AccountDetails />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AccountProvider>
      <AppContent />
    </AccountProvider>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
