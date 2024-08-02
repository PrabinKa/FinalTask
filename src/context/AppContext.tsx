import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {
  storeData,
  retrieveData,
  encryptData,
  decryptData,
  removeData,
} from '../utils';
import {ContextProviderProps, AppContextType} from '../types/ContextTypes';
import axiosInstance from '../services/axiosInstance';

export const AppContext = createContext<AppContextType>({
  token: null,
  tokenHandler: (prop: string) => {},
  user: null,
  fetchUserDetails: () => {},
});

const ContextProvider: React.FC<ContextProviderProps> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  //store and delete token when user login and logout
  const tokenHandler = async (token: string) => {
    try {
      if (token) {
        setToken(token);
        const encryptedToken = await encryptData(token, 'access_token');
        await storeData('access_token', encryptedToken);
      } else {
        await removeData('access_token');
        setToken(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const isUserLoggedIn = async () => {
    try {
      const token = await retrieveData('access_token');
      if (token) {
        const decryptedAccessToken = decryptData(token, 'access_token');
        setToken(decryptedAccessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get('/me');

      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        token,
        tokenHandler,
        user,
        fetchUserDetails,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
