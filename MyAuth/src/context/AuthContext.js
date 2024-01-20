import axios from 'axios';
import React, {createContext, useState} from 'react';
import {BASE_URL} from '../extras/config';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const register = (name, email, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/security/register`, {
        username: name,
        email: email,
        password: password,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error('register error', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const login = (name, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/security/Login`, {
        username: name,
        password: password,
      })
      .then(async res => {
        console.log(res.data);
        setUserInfo(res.data);
        await EncryptedStorage.setItem('userInfo', JSON.stringify(userInfo));
      })
      .catch(error => {
        console.error('login error', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const forgot = (name, email) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/security/forgot`, {
        username: name,
        email: email,
      })
      .then(async res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error('login error', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    axios
      .post(`${BASE_URL}/security/logout`)
      .then(res => {
        console.log(res.data);
        setUserInfo({});
      })
      .catch(error => {
        console.error('login error', error);
      });
  };

  const saveSignature = data => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/security/saveSignature`, {
        sign: data,
      })
      .then(async res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error('saveSignature error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        login,
        logout,
        forgot,
        register,
        saveSignature,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
