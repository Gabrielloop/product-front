import { authApiBack } from "../../api/authApiBack";
import { LoginFormInput } from "../../@types/Types";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "auth/AuthContext";

const FormRegister: React.FC = () => {
  const [serverError, setServerError] = useState("");
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext?.isLoggedIn;
  const loginUserRole = authContext?.loginUserRole;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    defaultValues: {
      userEmail: "",
      userPassword: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const requestAuth = {
      userEmail: data.userEmail,
      userPassword: data.userPassword,
    };

    try {
      let response;
      response = await authApiBack("/auth/register", requestAuth);
      if (response === undefined) {
        setServerError("An error occurred during login.");
        return;
      } else {
        authContext?.setIsLoggedIn(true);
        authContext?.setLoginUserId(response);
        authContext?.setLoginUserEmail(data.userEmail);
        authContext?.setLoginUserRole(response.userRole);

        const token = await response;
        localStorage.setItem("token", token);
      }
    } catch (error) {
      authContext?.setIsLoggedIn(false);

      setServerError("An error occurred during login.");
      console.log("error", error);
    }
  };

  return (
    <div>
      <h2>Insription</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("userEmail", { required: "Email requis" })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          {...register("userPassword", {
            required: "Mot de passe requis",
          })}
        />
        <button>S'inscrire</button>
      </form>
    </div>
  );
};

export default FormRegister;
