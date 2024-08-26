import { useCallback, useState } from 'react'

import { axiosBaseConfig } from '../utils/axios-base-config'

export default function useRegistry() {
  const [isLoading, setIsLoading] = useState(null)
  const [data, setData] = useState(null)

  const registryPlate = useCallback((formData) => {
    setIsLoading(true)

    axiosBaseConfig({
      method: 'post',
      url: '/placa/cadastro',
      headers: {
        'Content-Type': 'multiply/form-data',
      },
      data: formData
    })
    .then(response => console.log(response))
    .then((data) => setData(data))
    .finally(() => {
      setIsLoading(false)
    })
  }, [])

  return {registryPlate , data, isLoading}
}