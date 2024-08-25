import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ConsultaPlaca from "./components/ConsultaPlaca";
import RelatorioCidade from "./components/RelatorioCidade";
import UploadPlaca from "./components/UploadPlaca";

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
          </ul>
        </nav>

        <Routes>
          <Route path="/upload" element={<UploadPlaca />} />
          <Route path="/consulta" element={<ConsultaPlaca />} />
          <Route path="/relatorio" element={<RelatorioCidade />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
