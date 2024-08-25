import { useState } from "react";
import getPlate from "../actions/get-plate";

function ConsultaPlaca() {
  const [placa, setPlaca] = useState("");
  const [resultado, setResultado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!placa) return;

    // Consultando placa na API
    try {
      const data = await getPlate(placa)
      if(data) setResultado(data)

        console.log(data)

    } catch (e) {
      console.error(e)
    }
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
      {resultado && <p>Resultado: {JSON.stringify(resultado, null, 2)}</p>}
    </div>
  );
}

export default ConsultaPlaca;
