import { useCallback, useState } from 'react'

import { axiosBaseConfig } from '../utils/axios-base-config'

export default function useRegistry() {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

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
    .catch(e => {
      setError(e)
      console.error(e)
    }
    )
    .finally(() => {
      setIsLoading(false)
    })
  }, [])

  return {registryPlate ,error, isLoading}
}