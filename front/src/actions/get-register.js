import { API_BASE_URL } from '../utils/axios-base-config';

export default async function registerPlate(formData) {
  const response = await fetch(`${API_BASE_URL}/cadastro`, {
    method: 'POST',
    body: formData,
    headers: {
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error('erro ao registrar a placa');
  }

  return data;
}
