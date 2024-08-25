// Cadastro de placa
export default async function registryPlate(
  formData
){
  const api = 'http://localhost:8080/api'

  const response = await fetch(`${api}/placa/cadastro`, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
    body: formData
  })

  const data = await response.json()

  // 404 error code
  if (!response.ok) {
    throw new Error(data.error)
  }

  return data
}