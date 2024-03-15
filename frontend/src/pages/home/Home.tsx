import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  birthDate: string | null;
  address: Address | null;
  phoneNumber: string | null;
  role: string;
  enabled: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  authorities: Authority[];
  accountNonLocked: boolean;
}

interface Address {
  street: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

interface Authority {
  authority: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Pokud není token uložený, přesměrovat na stránku přihlášení
    } else {
      loadUsers(token); // Načtení dat uživatele pomocí tokenu
    }
  }, [navigate]);

  const loadUsers = async (token: string) => {
    try {
      const result = await axios.get<User[]>('http://localhost:8080/api/v1/auth/person/allusers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(result.data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token'); // Odstranění tokenu z localStorage
    navigate('/login'); // Přesměrování na stránku přihlášení po odhlášení
  };

  return (
    <div className="container">
      <div className='py-4'>
        <h2>Vítejte v bankovním systému</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Informace o klientovi</h5>
            <ul className="list-group">
              {users.map((user, index) => (
                <li className="list-group-item" key={index}>
                  <strong>{user.firstName} {user.lastName}</strong><br />
                  <span>Email: {user.email}</span><br />
                  <span>Username: {user.username}</span><br />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Informace o bankovním účtu</h5>
            <ul className="list-group">
              {users.map((user, index) => (
                <li className="list-group-item" key={index}>
                  <strong>{user.firstName} {user.lastName}</strong><br />
                  <span>Email: {user.email}</span><br />
                  <span>Username: {user.username}</span><br />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Button variant="contained" color="secondary" onClick={handleLogout}>Odhlásit se</Button> {/* Tlačítko odhlášení */}
    </div>
  );
}

export default Home;
