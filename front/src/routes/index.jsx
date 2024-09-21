import { createBrowserRouter, Navigate } from "react-router-dom";

import ConsultaPlaca from "../components/ConsultaPlaca";
import RelatorioCidade from "../components/RelatorioCidade";
import UploadPlaca from "../components/UploadPlaca";
import VideoTutorial from "../components/Video";

import AuthLayout from '../layout/auth-layout';
import MainLayout from "../layout/main-layout";
import CadastroPage from "../pages/Cadastro";
import LoginPage from "../pages/Login";

const routes = createBrowserRouter([

  {
    path: "/",
    element: (<Navigate to="/upload" />)
  },
  {
    path: "/login",
    element: (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    )
  },
  {
    path: "/cadastro",
    element: (
      <AuthLayout>
        <CadastroPage />
      </AuthLayout>
    )
  },
  {
    path: "/upload",
    element: (
      <AuthLayout>
        <MainLayout>
          <UploadPlaca />
        </MainLayout>
      </AuthLayout>
    )
  },
  {
    path: "/consulta",
    element: (
      <AuthLayout>
        <MainLayout>
          <ConsultaPlaca />
        </MainLayout>
      </AuthLayout>
    )
  },
  {
    path: "/relatorio",
    element: (
      <AuthLayout>
        <MainLayout>
          <RelatorioCidade />
        </MainLayout>
      </AuthLayout>
    )
  },
  {
    path: "/tutorial",
    element: (
      <AuthLayout>
        <MainLayout>
          <VideoTutorial />
        </MainLayout>
      </AuthLayout>
    )
  },

])

export default routes