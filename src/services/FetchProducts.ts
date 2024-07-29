import axios from 'axios';
import {
  BASE_URL,
  BEAUTY_PRODUCT,
  SMARTPHONES_PRODUCT,
  GROCERIES_PRODUCT,
} from './urls';

export const fetchProducts = async () => {
  try {
    const [response1, response2, response3] = await Promise.all([
      axios.get(`${BASE_URL}${SMARTPHONES_PRODUCT}`),
      axios.get(`${BASE_URL}${BEAUTY_PRODUCT}`),
      axios.get(`${BASE_URL}${GROCERIES_PRODUCT}`),
    ]);

    const smartPhones = response1.data;
    const beautyProducts = response2.data;
    const groceries = response3.data;

    const combinedProducts = {
      smartPhones,
      beautyProducts,
      groceries,
    };

    return combinedProducts;
  } catch (error) {
    console.log('error fetching products', error);
    throw error;
  }
};
