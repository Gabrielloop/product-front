import axios from "axios";

const hostUrl = "http://localhost:8080";

// Idem que dans authApiBack.ts, ici on utilise la méthode PUT

// J'ai ajouter des console.log pour récupérer les données envoyées à l'API

export const putApiBack = async (url: string, data: any) => {
  const urlFinal = hostUrl + url;

  try {
    const response = await axios.put(urlFinal, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    // Controle ici du status renvoyé par l'API : utilsé lors du développement
    if (response.status < 200 || response.status >= 300) {
      console.error("Réponse API en erreur :", response.data);
      throw new Error(
        `Erreur API: ${response.status} - ${response.statusText}`
      );
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Erreur serveur :", error.response.data);
      console.error("Code statut :", error.response.status);
    } else if (error.request) {
      console.error("Aucune réponse du serveur :", error.request);
    } else {
      console.error("Erreur de configuration :", error.message);
    }
    throw error;
  }
};
