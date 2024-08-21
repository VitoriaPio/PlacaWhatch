import React, { useState } from "react";

function RelatorioCidade() {
  const [cidade, setCidade] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cidade) return;

    console.log("Gerando relatório para:", cidade);
  };

  return (
    <div>
      <h2>Relatório por Cidade</h2>
      <form onSubmit={handleSubmit}>
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
