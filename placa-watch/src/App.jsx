import React from "react";
import UploadPlaca from "./components/UploadPlaca";
import ConsultaPlaca from "./components/ConsultaPlaca";
import RelatorioCidade from "./components/RelatorioCidade";

function App() {
  return (
    <div className="App">
      <h1>Placa Watch</h1>
      <UploadPlaca />
      <ConsultaPlaca />
      <RelatorioCidade />
    </div>
  );
}

export default App;
