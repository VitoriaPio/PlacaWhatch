
// components
import Header from '../../components/Header'

import styles from './main.module.css'

export default function MainLayout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main style={{
        height: '100%',
        width: '100%',
        padding: '24px 0px 0px 0px'
      }}>
        {children}
      </main>
    </div>
  )
}
