import axios from "axios";
import { useEffect, useState } from "react";

function VideoTutorial() {
  const [videoUrl, setVideoUrl] = useState(null); // Armazena a URL do vídeo
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Faz a requisição para pegar o vídeo da rota /videoTutorial
        const response = await axios.get("/videoTutorial", {
          responseType: "blob", // Blob para tratar o conteúdo de vídeo
        });

        const videoBlob = new Blob([response.data], { type: "video/mp4" });
        const videoObjectUrl = URL.createObjectURL(videoBlob);

        setVideoUrl(videoObjectUrl); // Define a URL do vídeo no estado
      } catch (error) {
        setMessage("Erro ao carregar o vídeo.");
        console.error(error);
      }
    };

    fetchVideo(); // Chama a função quando o componente é montado
  }, []);

  return (
    <div className="container">
      <h2>Vídeo Tutorial</h2>

      {message && <p>{message}</p>}

      {videoUrl ? (
        <video controls width="600">
          <source src={videoUrl} type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      ) : (
        <p>Carregando vídeo...</p>
      )}
    </div>
  );
}

export default VideoTutorial;
