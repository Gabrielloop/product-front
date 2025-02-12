import axios from "axios";

const hostUrl = "http://localhost:8080";

// GET methode to API
export const getApiBack = (url: string) => {
  const urlFinal = hostUrl + url;

  return axios
    .get(urlFinal, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.error("Erreur serveur :", error.response.data);
        console.error("Code statut :", error.response.status);
      } else if (error.request) {
        console.error("Aucune réponse du serveur :", error.request);
      } else {
        console.error("Erreur de configuration :", error.message);
      }
    });
};
