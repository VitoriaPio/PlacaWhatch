import { useState } from "react";
import useRegistry from "../hooks/use-registry";

function UploadPlaca() {
  const [file, setFile] = useState(null);
  const [cidade, setCidade] = useState("");
  const { registryPlate } = useRegistry()

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
    formData.append("image", file);
    formData.append("cidade", cidade);

    // Chamando função de registro de placa
    registryPlate(formData)
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
