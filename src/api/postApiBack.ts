import axios from "axios";

const hostUrl = "http://localhost:8080";

// Post methode to API
export const postApiBack = async (url: string, data: any) => {
  const urlFinal = hostUrl + url;

  const requestData = {
    ordersUserEmail: data.mail,
    ordersStatus: "Validation",
    ordersTotal: data.total.toFixed(2),
  };

  console.log("data postApiBack", requestData);

  try {
    const response = await axios.post(urlFinal, requestData, {
      headers: {
        "Content-Type": "application/json",
        //utiliser le local storage pour récupérer le token et le mettre en header.
      },
      withCredentials: true,
    });
    console.log("response.data", response.data);
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
