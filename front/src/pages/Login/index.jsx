import { useContext, useState } from "react";

import loginUser from '../../actions/login-user';

import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

import styles from './Login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false)

  const { setIsAuthenticated } = useContext(AuthContext)

  const navigate = useNavigate()

  function goToHome() {
    navigate('/upload')
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const { token, message } = await loginUser(email, senha)

      if (token) {
        // Registrando token no storage local
        localStorage.setItem("token", token);
        setIsAuthenticated(true);

        // Redirecionando para a tela de upload
        goToHome()
      }
    } catch (e) {
      setMessage(e);
      console.error(e);
    }

    // Finalizando loading
    setIsLoading(false)
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Login</h2>
          <input
            className={styles.formInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className={styles.formInput}
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            required
          />

          <button
            className={styles.submitButton}
            disabled={isLoading} type="submit"
          >
            Entrar
          </button>
          {isLoading && <p>Carregando...</p>}

        </form>
        <Link to='/cadastro' onClick={(e) => { e.preventDefault(), navigate('/cadastro') }} disabled={isLoading}>
          Não tem uma conta? Cadastre-se
        </Link>
      </div>
    </div>
  );
}
