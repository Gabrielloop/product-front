import { LoginFormInput } from "../@types/Types";
import { AuthContext } from "auth/AuthContext";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { authApiBack } from "api/authApiBack";
import FormLogin from "components/core/FormLogin";
import FormRegister from "components/core/FormRegister";
import CommandList from "components/core/CommandList";
import Admin from "./Admin";
import { Helmet } from "react-helmet-async";

const Dashboard: React.FC = () => {
  const [serverError, setServerError] = useState("");
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext?.isLoggedIn;
  const loginUserRole = authContext?.loginUserRole;
  const loginUserEmail = authContext?.loginUserEmail;

  const handleLogout = () => {
    authContext?.setIsLoggedIn(false);
    authContext?.setLoginUserId(0);
    authContext?.setLoginUserEmail("");
    authContext?.setLoginUserRole("");

    localStorage.removeItem("token");
  };

  return (
    <>
      <Helmet>
        <title>Pokémart : Mon Compte</title>
      </Helmet>
      <div>
        <h2>Dashboard</h2>
        {isLoggedIn ? (
          loginUserRole === "ADMIN" ? (
            <>
              <div>
                <h3>
                  Vous êtes connecté en tant qu'administrateur ({loginUserRole})
                </h3>
                <button onClick={handleLogout}>Se déconnecter</button>
              </div>
              <Admin />
            </>
          ) : (
            <>
              <div>
                <h3>Vous êtes connecté ({loginUserRole})</h3>
                <button onClick={handleLogout}>Se déconnecter</button>
              </div>
              <div>Liste</div>
              <CommandList mail={loginUserEmail || ""} />
            </>
          )
        ) : (
          <>
            <div>
              <FormLogin />
            </div>
            <div>
              <FormRegister />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
