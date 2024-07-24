import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AccountProvider } from './accountContextApi/AccountContext';
import Header from './components/header/Header';
import LoginPage from './pages/login_registration/LoginPage';
import RegistrationPage from './pages/login_registration/RegistrationPage';
import Home from './pages/mainPage/MainPage';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/navbar/Navbar';
import CreateAccount from './pages/mainPage/components/CreateAccount';
import AccountsInfoTable from './pages/mainPage/components/AccountInfoTable';
import SendPayment from './pages/mainPage/components/SendPayment';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && !window.location.pathname.startsWith("/register")) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:8080/api/v1/auth/authResponse", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
      })
      .catch((error) => {
        if (!window.location.pathname.startsWith("/register")) {
          navigate("/login");
        }
      });
  }, [navigate]);


  return (
    <AccountProvider>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />}>
            <Route path="createAccount" element={<CreateAccount />} />
            <Route path="accountInfo" element={<AccountsInfoTable />} />
            <Route path="payment" element={<SendPayment />} />
          </Route>
        </Route>
      </Routes>
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
