import { API_BASE_URL } from '../utils/axios-base-config';

export default async function registerPlate(formData) {
  const response = await fetch(`${API_BASE_URL}/placa/cadastro`, {
    method: 'POST',
    body: formData,
    headers: {
        'PRIVATE-KEY': '{{private_key}}'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error('erro ao registrar a placa');
  }

  return data;
}
