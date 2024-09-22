import React, { useState } from "react";
import getReport from "../actions/get-report";

function RelatorioCidade() {
  const [cidade, setCidade] = useState("");

  const token = window.localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cidade) return;

    console.log("Gerando relatório para:", cidade);

    try {
      const data = await getReport(cidade, token)
      if (data) setResultado(data)

      console.log(data)

    } catch (e) {
      console.error(e)
    }

  };

  return (
    <div className="container">
      <h2>Relatório por Cidade</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Cidade"
        />
        <button type="submit">Gerar Relatório</button>
      </form>
    </div>
  );
}

export default RelatorioCidade;
