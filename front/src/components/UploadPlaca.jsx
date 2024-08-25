import { useState } from "react";
import registerPlate from "../actions/get-register";

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
    formData.append("image", file);
    formData.append("cidade", cidade);
  
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      const result = await registerPlate(formData);
      console.log('Plate registered successfully:', result);
    } catch (error) {
      console.error('Error registering plate:', error.message);
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
    </div>
  );
}

export default UploadPlaca;
