import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AccountProvider } from './accountContextApi/AccountContext';
import LoginPage from './pages/login_registration/LoginPage';
import RegistrationPage from './pages/login_registration/RegistrationPage';
import CreateAccount from './pages/mainPage/components/CreateAccount';
import AccountsInfoTable from './pages/mainPage/components/homeAccountsTransactionsTable/AccountInfoTable';
import SendPayment from './pages/mainPage/components/SendPayment';
import Home from './pages/mainPage/Home';
import AccountDetails from './pages/mainPage/components/AccountDetails';
import ProtectedRoute from './accountContextApi/ProtectedRoute';
import UserDetails from './pages/mainPage/components/UserDetails';
import AppBarAndDrawer from './pages/AppBarAndDrawer';

const App: React.FC = () => {
  return (
    <Router>
      <AccountProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />}>
              <Route path="createAccount" element={<CreateAccount />} />
              <Route path="accountsInfo" element={<AccountsInfoTable />} />
              <Route path="payment" element={<SendPayment />} />
              <Route path="accountDetails" element={<AccountDetails />} />
              <Route path="userDetails" element={<UserDetails />} />
            </Route>
          </Route>
        </Routes>
      </AccountProvider>
    </Router>
  );
};

export default App;