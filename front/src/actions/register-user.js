import { API_BASE_URL } from '../utils/axios-base-config';

export default async function registerUser(email, senha) {
  const response = await fetch(`${API_BASE_URL}/usuario/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? 'Erro ao cadastrar usuário');
  }

  return data;
}
