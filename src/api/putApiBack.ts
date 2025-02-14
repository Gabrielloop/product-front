import axios from "axios";

const hostUrl = "http://localhost:8080";

// PUT methode to API
export const putApiBack = async (url: string, data: any) => {
  const urlFinal = hostUrl + url;
  console.log("data putApiBack", data);

  try {
    const response = await axios.put(urlFinal, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    console.log("Réponse complète API :", response); // 🔥 DEBUG

    if (response.status < 200 || response.status >= 300) {
      console.error("Réponse API en erreur :", response.data);
      throw new Error(
        `Erreur API: ${response.status} - ${response.statusText}`
      );
    }

    console.log("Produit mis à jour avec succès :", response.data);
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
    throw error; // Relance l'erreur pour voir où elle est capturée
  }
};
