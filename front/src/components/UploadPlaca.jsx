import { useState } from "react";
import useRegistry from "../hooks/use-registry";

function UploadPlaca() {
  const [file, setFile] = useState(null);
  const [cidade, setCidade] = useState("");
  const [message, setMessage] = useState("");

  const {registryPlate, data, isLoading} = useRegistry()

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
    
    try {
      // Enviando formData para registrar placa
      registryPlate(formData)
    } catch (e) {
      console.error(e)
      throw new Error(e)
    }
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

      {isLoading && <p>Carregando...</p>}
      {data && <p>{JSON.stringify(data, '', 2)}</p>}
      {}
    </div>
  );
}

export default UploadPlaca;
