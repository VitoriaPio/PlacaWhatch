import { Link } from 'react-router-dom'

import styles from './main.module.css'

export default function MainLayout({ children }) {
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
      </header>
      {children}
    </div>
  )
}
