import { API_BASE_URL } from '../utils/axios-base-config'

export default async function getPlate(plate) {
  const response = await fetch(`${API_BASE_URL}/placa/consulta/${plate}`, {
    method: 'GET'
  })

  const placa = req.params.placa ?? ''

  if(placa) {
    res.json({
      message: `Placa ${placa} encontrada`
    })
  }

  res.status(404).json({
    message: 'Placa não encontrada'
  })
}