import { useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./auth.module.css"

import { useContext } from "react"
import { AuthContext } from "../../context/auth-context"

export default function AuthLayout({ children }) {
  const { isAuthenticated } = useContext(AuthContext)

  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      navigate('/usuario')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
