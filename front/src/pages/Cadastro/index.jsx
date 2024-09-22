import { useState } from "react";

import { Link, useNavigate } from 'react-router-dom';

import registerUser from "../../actions/register-user";

import styles from './Cadastro.module.css';

export default function CadastroPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [isLoading, setIsLoading] = useState(false)


  const navigate = useNavigate()

  function goToLogin() {
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const data = await registerUser(email, senha)

      console.log(data)

      if (data) goToLogin()
    } catch (e) {
      console.error(e);
    }

    // Finalizando loading
    setIsLoading(false)
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Cadastro de usuário</h2>
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
            disabled={isLoading}
            type="submit"
          >
            Cadastrar
          </button>
          {isLoading && <p>Carregando...</p>}
        </form>


        <Link to='/login' onClick={(e) => { e.preventDefault(), goToLogin() }} disabled={isLoading}>
          Já possui uma conta? Fazer Login
        </Link>
      </div>
    </div>
  );
}
