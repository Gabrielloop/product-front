// Fonction pour récupérer et décoder le token JWT
export const decodeToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = JSON.parse(atob(base64));

    return jsonPayload;
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    return null;
  }
};

// Récupérer le rôle de l'utilisateur
export const getUserRole = () => {
  const decoded = decodeToken();
  return decoded ? decoded.role : null;
};

// Vérifier si l'utilisateur est admin
export const isUserAdmin = () => {
  return getUserRole() === "admin";
};

// Récupérer l'email de l'utilisateur
export const getUserEmail = () => {
  const decoded = decodeToken();
  return decoded ? decoded.email : null;
};

// Vérifier si un utilisateur est connecté (JWT valide)
export const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Vérifie juste si le token existe
};

// Déconnexion de l'utilisateur
export const logout = () => {
  localStorage.removeItem("token");
};
