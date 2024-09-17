import React, { useState } from "react";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import ConsultaPlaca from "./components/ConsultaPlaca";
import RelatorioCidade from "./components/RelatorioCidade";
import UploadPlaca from "./components/UploadPlaca";
import Auth from "./components/CadastroUsuario"; 
import VideoTutorial from "./components/Video";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  return (
    <Router>
      <div className="App">
        {!isAuthenticated ? (
          <Routes>
            {/* Se não estiver autenticado, exibe a tela de login */}
            <Route
              path="*"
              element={<Auth setIsAuthenticated={setIsAuthenticated} />}
            />
          </Routes>
        ) : (
          <>
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
                  <Link to="/usuario">Cadastro Usuário</Link>
                </li>
                <li>
                  <Link to="/tutorial">Tutorial</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/upload" element={<UploadPlaca />} />
              <Route path="/consulta" element={<ConsultaPlaca />} />
              <Route path="/relatorio" element={<RelatorioCidade />} />
              <Route path="/usuario" element={<Auth />} />
              <Route path="/tutorial" element={<VideoTutorial />} />
              <Route path="/" element={<Navigate to="/upload" />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
