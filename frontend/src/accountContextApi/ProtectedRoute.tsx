import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAccountContext } from './AccountContext';

const checkTokenValidity = async (token: string) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/authResponse`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

const ProtectedRoute = () => {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { setSelectedAccount, setSelectedAccountId } = useAccountContext();

    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                const valid = await checkTokenValidity(token);
                setIsValid(valid);
                if (!valid) {
                    setSelectedAccount(null);
                    setSelectedAccountId(null);
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } else {
                setSelectedAccount(null);
                setSelectedAccountId(null);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        verifyToken();
    }, [token, navigate]);

    if (isValid === null) {
        return <div>Loading...</div>;
    }

    return isValid ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;