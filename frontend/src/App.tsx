import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import LoginPage from './pages/login_registration/LoginPage';
import RegistrationPage from './pages/login_registration/RegistrationPage';
import Navbar from './components/navbar/Navbar';
import Header from './components/header/Header';
import { createContext, useContext, useState } from 'react';


interface AuthContextType {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setLoggedIn: () => {}
});

const App = () => {
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
        <Navbar />
        <Routes>
          {!isLoggedIn && (
            <>
             <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} />} />
              <Route path="/register" element={<RegistrationPage />} />
            </>
          )}
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;