import { API_BASE_URL } from '../utils/axios-base-config';

export default async function registerUser(email, senha) {
  const response = await fetch(`${API_BASE_URL}/usuario/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    throw new Error('Erro ao cadastrar usuário');
  }

  const data = await response.json();
  return data;
}
