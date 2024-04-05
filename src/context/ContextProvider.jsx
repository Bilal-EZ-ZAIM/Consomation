import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UserContext = createContext();

const ContextProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [TypeUtilisateur, setTypeUtilisateur] = useState();
  const [user, setuser] = useState();
  const [token, setToken] = useState('');
  const storedToken = localStorage.getItem('tokens');
  const isToken = () => {
    if (storedToken) {
      setToken(storedToken);

      return true;
    }
  };

  const isLogin = async () => {

    if (storedToken) {
      try {
        const config = {
          headers: {
            Authorization: 'Bearer ' + storedToken,
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.get('http://127.0.0.1:8000/api/token', config);

        setuser(response.data.user);
        setIsAuthenticated(true);
        setTypeUtilisateur(response.data.user.role);
      } catch (error) {
        console.error('Erreur lors de la requête GET :', error);
      }
      return true;
    }
    return false;
  };

  console.log(TypeUtilisateur);
  useEffect(() => {
    isLogin();
  }, []);





  console.log(user);
  return (
    <UserContext.Provider value={{
      user, setuser,
      isAuthenticated, setIsAuthenticated
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
