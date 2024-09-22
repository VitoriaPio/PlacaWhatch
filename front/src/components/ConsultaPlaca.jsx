import { useState } from "react";
import getPlate from "../actions/get-plate";

function ConsultaPlaca() {
  const [placa, setPlaca] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultado, setResultado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!placa) return;


    // Consultando placa na API
    try {
      setIsLoading(true)

      const data = await getPlate(placa)
      if (data) setResultado(data)

    } catch (e) {
      console.error(e)
    }

    setIsLoading(false)
  };

  return (
    <div className="container">
      <h2>Consulta de Placa</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          placeholder="Número da Placa"
        />
        <button type="submit">Consultar</button>
      </form>
      {isLoading && <p>Carregando...</p>}
      {resultado && <p>Resultado: {JSON.stringify(resultado, null, 2)}</p>}
    </div>
  );
}

export default ConsultaPlaca;
