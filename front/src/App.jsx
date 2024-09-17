import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ConsultaPlaca from "./components/ConsultaPlaca";
import RelatorioCidade from "./components/RelatorioCidade";
import UploadPlaca from "./components/UploadPlaca";
import Auth from "./components/CadastroUsuario";
import VideoTutorial from "./components/Video";

function App() {
  return (
    <Router>
      <div className="App">
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
          <Route path="/tutorial" element={<VideoTutorial  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
