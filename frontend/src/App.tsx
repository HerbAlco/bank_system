import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import LoginPage from './pages/login_registration/LoginPage';
import RegistrationPage from './pages/login_registration/RegistrationPage';
import Navbar from './components/navbar/Navbar';
import Header from './components/header/Header';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;