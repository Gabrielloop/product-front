import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Product } from "../../@types/Types";
import { postApiBack } from "../../api/postApiBack";

const API_URL = "http://localhost:8080/product/add"; // Remplace par ton URL

const ProductAddForm: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit: SubmitHandler<Product> = async (data) => {
    try {
      const response = await postApiBack(`/product/add`, data);

      console.log("data envoyée :", data);
      console.log("Réponse API :", response);

      // ✅ Vérification correcte avec Axios
      if (response.status < 200 || response.status >= 300) {
        throw new Error(
          `Erreur API: ${response.status} - ${response.statusText}`
        );
      }

      console.log(`Produit ${data.productId} ajouté avec succès !`);
    } catch (error) {
      console.error("Erreur lors de l'ajout' :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <h3>Ajouter un produit</h3>
      {message && <p className="message">{message}</p>}
      <label>Nom du produit</label>
      <input
        className="input-standart"
        type="text"
        {...register("productName", {
          required: "Le nom du produit est requis",
        })}
      />
      {errors.productName && (
        <p className="error">{errors.productName.message}</p>
      )}

      <label>Description</label>
      <input
        className="input-standart"
        type="text"
        {...register("productDescription", {
          required: "La description est requise",
        })}
      />
      {errors.productDescription && (
        <p className="error">{errors.productDescription.message}</p>
      )}

      <label>Prix</label>
      <input
        className="input-standart"
        type="number"
        step="0.01"
        {...register("productPrice", { required: "Le prix est requis" })}
      />
      {errors.productPrice?.message && (
        <p className="error">{String(errors.productPrice.message)}</p>
      )}

      <label>Stock</label>
      <input
        className="input-standart"
        type="number"
        {...register("productStock", { required: "Le stock est requis" })}
      />
      {errors.productStock && (
        <p className="error">{errors.productStock.message}</p>
      )}

      <label>Statut</label>
      <select
        {...register("productDeleted")}
        className="input-standart"
        style={{ height: "40px" }}
      >
        <option value="true">Indisponible</option>
      </select>

      <label>Catégorie</label>
      <input
        className="input-standart"
        type="text"
        {...register("productCategory")}
      />

      <label>URL de l'image</label>
      <input
        className="input-standart"
        type="text"
        {...register("productImage")}
      />

      <button type="submit">Ajouter le produit</button>
    </form>
  );
};

export default ProductAddForm;
