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
      <div id="dashboard">
        {isLoggedIn ? (
          loginUserRole === "ADMIN" ? (
            <>
              <section>
                <article>
                  <h2>Mon compte</h2>
                  <p>
                    {loginUserEmail} ({loginUserRole})
                  </p>
                </article>
                <button onClick={handleLogout}>Se déconnecter</button>
              </section>
              <section className="dashboard-content">
                <Admin />
              </section>
            </>
          ) : (
            <>
              <section>
                <article>
                  <h2>Mon compte</h2>
                  <p>
                    {loginUserEmail} ({loginUserRole})
                  </p>
                </article>
                <button onClick={handleLogout}>Se déconnecter</button>
              </section>
              <section className="dashboard-content">
                <CommandList mail={loginUserEmail || ""} />
              </section>
            </>
          )
        ) : (
          <>
            <section>
              <h3>Vous n'êtes pas connecté</h3>
            </section>
            <section className="dashboard-content section-login-register">
              <h3>Connectez-vous ou créez un compte</h3>
              <FormLogin />
              <FormRegister />
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
