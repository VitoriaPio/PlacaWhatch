import React, { useState } from "react";
import registryPlate from "../actions/registry-plate";

function UploadPlaca() {
  const [file, setFile] = useState(null);
  const [cidade, setCidade] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCidadeChange = (e) => {
    setCidade(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !cidade) return;

    const formData = new FormData();
    formData.append("foto", file);
    formData.append("cidade", cidade);

    registryPlate(formData).then((res) => console.log(res)).catch((e) = console.error(e))

    // console.log("Uploading:", {file, cidade});
  };

  return (
    <div>
      <h2>Upload de Placa</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          value={cidade}
          onChange={handleCidadeChange}
          placeholder="Cidade"
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadPlaca;
