import { Outlet } from 'react-router-dom'
import styles from './styles/AuthLayout.module.css'

function AuthLayout() {
  return (
    <div className="appShell">
      <div className={styles.appMainLogin}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout