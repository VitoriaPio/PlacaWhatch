import { createBrowserRouter } from "react-router-dom";

import CadastroUsuario from "../components/CadastroUsuario";
import ConsultaPlaca from "../components/ConsultaPlaca";
import RelatorioCidade from "../components/RelatorioCidade";
import UploadPlaca from "../components/UploadPlaca";
import VideoTutorial from "../components/Video";

const router = createBrowserRouter([
  {
    path: "/usuario",
    element: <CadastroUsuario />
  },
  {
    path: "/upload",
    element: <UploadPlaca />
  },
  {
    path: "/consulta",
    element: <ConsultaPlaca />
  },
  {
    path: "/relatorio",
    element: <RelatorioCidade />
  },
  {
    path: "/tutorial",
    element: <VideoTutorial />
  },

])