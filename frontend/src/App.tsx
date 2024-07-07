import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/mainPage/Home';
import LoginPage from './pages/login_registration/LoginPage';
import RegistrationPage from './pages/login_registration/RegistrationPage';
import Navbar from './components/navbar/Navbar';
import { AccountProvider } from './accountContextApi/AccountContext';

const App = () => {
  return (
    <Router>
      <AccountProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AccountProvider>
    </Router>
  );
}

export default App;
