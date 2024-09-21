import { useState } from "react";

import { useNavigate } from 'react-router-dom';

import registerUser from "../../actions/register-user";

import styles from './Login.module.css';

export default function CadastroPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");

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
      setMessage(data.message);
    } catch (e) {
      setMessage(e);
      console.error(e);
    }

    // Finalizando loading
    setIsLoading(false)
  };

  return (
    <div style={styles.container}>
      <h2>cadastro de usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
        />
        <button disabled={isLoading} type="submit">
          Cadastrar
        </button>
        {isLoading && <p>Carregando...</p>}
        {message && <p>{message}</p>}
      </form>


      <button disabled={isLoading}>
        Já tem uma conta? faça login
      </button>
    </div>
  );
}
