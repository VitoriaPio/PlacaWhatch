import { useState } from "react";
import registerUser from "../actions/register-user";
import loginUser from "../actions/login-user";

function Auth() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Usando a função loginUser
        const data = await loginUser(email, senha);
        const token = data.token; // Supondo que o token seja retornado no login
        setMessage("Login bem-sucedido!");
        localStorage.setItem("token", token); // Armazenando o token no localStorage
      } else {
        // Usando a função registerUser
        await registerUser(email, senha);
        setMessage("Usuário cadastrado com sucesso!");
      }
    } catch (e) {
      setMessage(
        isLogin ? "Email ou senha incorretos." : "Erro ao cadastrar o usuário."
      );
      console.error(e);
    }
  };

  return (
    <div>
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
        <button type="submit">{isLogin ? "Entrar" : "Cadastrar"}</button>
      </form>

      {message && <p>{message}</p>}

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Não tem uma conta? Cadastre-se"
          : "Já tem uma conta? Faça login"}
      </button>
    </div>
  );
}

export default Auth;
