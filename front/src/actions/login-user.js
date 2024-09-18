import { API_BASE_URL } from '../utils/axios-base-config';

export default async function loginUser(email, senha) {
  const response = await fetch(`${API_BASE_URL}/usuario/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? 'Ocorreu um erro ao realizar o login');
  }

  return data;
}
