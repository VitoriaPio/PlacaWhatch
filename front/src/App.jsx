import React, { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import ConsultaPlaca from "./components/ConsultaPlaca";
import RelatorioCidade from "./components/RelatorioCidade";
import UploadPlaca from "./components/UploadPlaca";
import VideoTutorial from "./components/Video";

import CadastroUsuario from "./components/CadastroUsuario";

import AuthLayout from './layout/auth-layout';
import MainLayout from "./layout/main-layout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        {/* Componente que verifica se esta autenticado */}

        <Routes>
          <Route path="/usuario" element={
            <AuthLayout>
              <CadastroUsuario />
            </AuthLayout>
          } />
          <Route path="/upload" element={
            <AuthLayout>
              <MainLayout>
                <UploadPlaca />
              </MainLayout>
            </AuthLayout>
          } />
          <Route path="/consulta" element={
            <AuthLayout>
              <MainLayout>
                <ConsultaPlaca />
              </MainLayout>
            </AuthLayout>
          } />
          <Route path="/relatorio" element={
            <AuthLayout>
              <MainLayout>
                <RelatorioCidade />
              </MainLayout>
            </AuthLayout>
          } />
          <Route path="/tutorial" element={
            <AuthLayout>
              <MainLayout>
                <VideoTutorial />
              </MainLayout>
            </AuthLayout>
          } />
          <Route path="/" element={<Navigate to="/upload" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
