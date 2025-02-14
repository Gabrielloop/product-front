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
    <section>
      <h2>Ajouter un produit</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        <label>Nom du produit</label>
        <input
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
          type="number"
          step="0.01"
          {...register("productPrice", { required: "Le prix est requis" })}
        />
        {errors.productPrice?.message && (
          <p className="error">{String(errors.productPrice.message)}</p>
        )}

        <label>Stock</label>
        <input
          type="number"
          {...register("productStock", { required: "Le stock est requis" })}
        />
        {errors.productStock && (
          <p className="error">{errors.productStock.message}</p>
        )}

        <label>Statut</label>
        <select {...register("productDeleted")}>
          <option value="true">Indisponible</option>
        </select>

        <label>Catégorie</label>
        <input type="text" {...register("productCategory")} />

        <label>URL de l'image</label>
        <input type="text" {...register("productImage")} />

        <button type="submit">Ajouter le produit</button>
      </form>
    </section>
  );
};

export default ProductAddForm;
