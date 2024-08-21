import React, { useState } from "react";

function ConsultaPlaca() {
  const [placa, setPlaca] = useState("");
  const [resultado, setResultado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!placa) return;

    console.log("Consultando:", placa);
  };

  return (
    <div>
      <h2>Consulta de Placa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          placeholder="Número da Placa"
        />
        <button type="submit">Consultar</button>
      </form>
      {resultado && <p>Resultado: {resultado}</p>}
    </div>
  );
}

export default ConsultaPlaca;
