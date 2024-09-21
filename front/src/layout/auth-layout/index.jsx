import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./auth.module.css"

import { useContext } from "react"
import { AuthContext } from "../../context/auth-context"

export default function AuthLayout({ children }) {
  const { isAuthenticated } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
