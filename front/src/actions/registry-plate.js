// Cadastro de placa
export default async function registryPlate(
  formData
){
  const api = 'http://localhost:8080/api'
  const file = formData.get("foto")
  const city = formData.get("cidade")

  console.log('log action', {file, city})

  const response = await fetch(`${api}/placa/cadastro`, {
    method: 'POST',
    body: JSON.stringify({file, city})
  })

  const data = await response.json()

  // 404 error code
  if (!response.ok) {
    throw new Error(data.error)
  }

  return data
}