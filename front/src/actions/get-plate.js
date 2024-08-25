import { API_BASE_URL } from '../utils/axios-base-config';

export default async function getPlate(plate) {
  const response = await fetch(`${API_BASE_URL}/placa/consulta/${plate}`, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error('Placa não encontrada');
  }

  const data = await response.json();
  return data;
}
