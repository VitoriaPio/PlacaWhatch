import { Link, useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { AuthContext } from '../../context/auth-context'

import styles from './Header.module.css'

export default function Header() {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AuthContext)

  function logOut() {
    setIsAuthenticated(false)

    navigate('/login')
  }

  return (
    <header className={styles.container}>
      <h1 className={styles.headerTitle}>Placa Watch</h1>
      <nav className={styles.headerNav}>
        <ul className={styles.navList}>
          <li>
            <Link to="/upload">Upload de Placa</Link>
          </li>
          <li>
            <Link to="/consulta">Consulta de Placa</Link>
          </li>
          <li>
            <Link to="/relatorio">Relatório por Cidade</Link>
          </li>
          <li>
            <Link to="/tutorial">Tutorial</Link>
          </li>
        </ul>
      </nav>
      <button onClick={() => logOut()}>Logout</button>
    </header>
  )
}
