import axios from "axios";

const hostUrl = "http://localhost:8080";

// Post methode to API
export const postApiBack = async (url: string, data: any) => {
  const urlFinal = hostUrl + url;
  console.log("data postApiBack", data);

  try {
    const response = await axios.post(urlFinal, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
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
  }
};
