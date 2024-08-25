import { API_BASE_URL } from '../utils/axios-base-config'

export default async function getPlate(plate) {
  const response = await fetch(`${API_BASE_URL}/placa/consulta/${plate}`, {
    method: 'GET'
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error('Ocorreu um erro ao consultar placa')
  }

  return data
}