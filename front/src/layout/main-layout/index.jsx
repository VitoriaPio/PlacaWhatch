import { Link, useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { AuthContext } from '../../context/auth-context'
import styles from './main.module.css'

export default function MainLayout({ children }) {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AuthContext)

  function logOut() {
    setIsAuthenticated(false)

    navigate('/usuario')
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Placa Watch</h1>
        <nav className="menu">
          <ul>
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
      {children}
    </div>
  )
}
