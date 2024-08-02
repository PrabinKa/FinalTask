import axios from 'axios';
import {BASE_URL, LOGIN} from './urls';

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${BASE_URL}${LOGIN}`, {
    username,
    password,
    expiresInMins: 2,
  });
  return response;
};
