import { useContext, useState } from "react";

import loginUser from "../actions/login-user";
import registerUser from "../actions/register-user";

import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

export default function CadastroUsuario() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(false)

  const { setIsAuthenticated } = useContext(AuthContext)

  const navigate = useNavigate()

  function goToHome() {
    navigate('/upload')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    if (isLogin) {
      try {
        const { token, message } = await loginUser(email, senha)

        setMessage(message);

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
    } else {
      try {
        const { message } = await registerUser(email, senha)

        setMessage(message);
        setIsLogin(true);
      } catch (e) {
        setMessage(e);
        console.error(e);
      }
    }

    // Finalizando loading
    setIsLoading(false)
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <h2>{isLogin ? "Login" : "Cadastro"}</h2>
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
        <button disabled={isLoading} type="submit">{isLogin ? "Entrar" : "Cadastrar"}</button>
        {isLoading && <p>Carregando...</p>}
      </form>

      {message && <p>{message}</p>}

      <button disabled={isLoading} onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Não tem uma conta? Cadastre-se"
          : "Já tem uma conta? Faça login"}
      </button>
    </div>
  );
}
