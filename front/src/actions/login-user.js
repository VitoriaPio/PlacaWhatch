import { API_BASE_URL } from '../utils/axios-base-config';

export default async function loginUser(email, senha) {
  const response = await fetch(`${API_BASE_URL}/usuario/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    throw new Error('Email ou senha incorretos');
  }

  const data = await response.json();
  return data;
}
