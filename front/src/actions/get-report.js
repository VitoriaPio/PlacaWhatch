import { API_BASE_URL } from '../utils/axios-base-config'

export default async function getReport(cidade) {
  const response = await fetch(`${API_BASE_URL}/placa/relatorio/cidade/${cidade}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/pdf'
    }
  })

  if (!response.ok) {
    throw new Error('erro ao gerar relatorio')
  }

  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)


  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${cidade}.pdf`)
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)

  return blob
}
