
// components
import Header from '../../components/Header'

import styles from './main.module.css'

export default function MainLayout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  )
}
