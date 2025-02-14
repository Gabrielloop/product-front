import { LoginFormInput } from "../@types/Types";
import axios from "axios";

// Lien vers le serveur API
const hostUrl = "http://localhost:8080";

// Je détermine une fonction qui va appeler l'API pour l'authentification
export const authApiBack = async (url: string, data: LoginFormInput) => {
  // je construit l'url final de l'enpoint
  const urlFinal = hostUrl + url;
  try {
    // J'appelle l'API avec axios. Ici, j'utilise une methode POST.
    const response = await axios.post(urlFinal, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    // L'api me retourne une réponse, je la retourne à mon composant
    return response.data;
  } catch (error: any) {
    // Je récupère les erreurs puis je les affiche en console
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
