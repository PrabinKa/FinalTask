import {BASE_URL} from './urls';

export const getPosts = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`);

  return response;
};

export const searchPosts = async (query: string) => {
  const response = await fetch(`${BASE_URL}/posts/search?q=${query}`);
  const data = await response.json();

  return data;
};

export const deletePost = async (id: number) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  return response;
};

interface CredentialsType {
  title: string;
  body: string;
}

export const editPost = async (id: number, credentials: CredentialsType) => {
  const response = await fetch(`https://dummyjson.com/posts/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title: credentials.title,
      body: credentials.body,
    }),
  });

  return response;
};
