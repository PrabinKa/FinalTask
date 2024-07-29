import axios from 'axios';

const BASE_URL = `https://dummyjson.com`;
const LOGIN = `/auth/login`;
const USER = `/auth/me`;
const REFRESH_TOKEN = `/auth/refresh`;
const BEAUTY_PRODUCT = `/products/category/beauty`;
const SMARTPHONES_PRODUCT = `/products/category/smartphones`;
const GROCERIES_PRODUCT = `/products/category/groceries`;

const axiosInstance = axios.create({
  baseURL: `https://dummyjson.com/auth/`,
});

export {
  BASE_URL,
  LOGIN,
  USER,
  REFRESH_TOKEN,
  axiosInstance,
  BEAUTY_PRODUCT,
  SMARTPHONES_PRODUCT,
  GROCERIES_PRODUCT,
};