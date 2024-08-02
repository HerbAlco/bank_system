import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AccountProvider } from './accountContextApi/AccountContext';
import Header from './components/header/Header';
import LoginPage from './pages/login_registration/LoginPage';
import RegistrationPage from './pages/login_registration/RegistrationPage';
import ProtectedRoute from './ProtectedRoute';
import CreateAccount from './pages/mainPage/components/CreateAccount';
import AccountsInfoTable from './pages/mainPage/components/homeAccountsTransactionsTable/AccountInfoTable';
import SendPayment from './pages/mainPage/components/SendPayment';
import Home from './pages/mainPage/Home';
import AccountDetails from './pages/mainPage/components/AccountDetails';

const App = () => {
  return (
    <Router>
      <AccountProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/home" element={<Home />}>
            <Route path="createAccount" element={<CreateAccount />} />
            <Route path="accountsInfo" element={<AccountsInfoTable />} />
            <Route path="payment" element={<SendPayment />} />
            <Route path='accountDetails' element={<AccountDetails />} />
          </Route>
          {/* </Route> */}
        </Routes>
      </AccountProvider>
    </Router>
  );
};

export default App;