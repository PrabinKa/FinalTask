import {BASE_URL} from './urls';

export const searchProductFromApi = async (query: string) => {
  const response = await fetch(`${BASE_URL}/products/search?q=${query}`);

  return response;
};
