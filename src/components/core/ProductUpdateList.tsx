import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Product } from "../../@types/Types";
import { putApiBack } from "../../api/putApiBack";

interface ProductUpdateListProps {
  productList: Product[];
}

const ProductUpdateList: React.FC<ProductUpdateListProps> = ({
  productList,
}) => {
  return (
    <div>
      <h3>Liste des produits</h3>
      <div className="product-list">
        {productList.map((productLine: Product) => (
          <ProductUpdateForm
            key={productLine.productId}
            product={productLine}
          />
        ))}
      </div>
    </div>
  );
};

interface ProductUpdateFormProps {
  product: Product;
}

const ProductUpdateForm: React.FC<ProductUpdateFormProps> = ({ product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: product,
  });

  const onUpdate: SubmitHandler<Product> = async (data) => {
    try {
      const response = await putApiBack(`/product/update`, data);

      console.log("data envoyée :", data);
      console.log("Réponse API :", response);

      // ✅ Vérification correcte avec Axios
      if (response.status < 200 || response.status >= 300) {
        throw new Error(
          `Erreur API: ${response.status} - ${response.statusText}`
        );
      }

      console.log(`Produit ${data.productId} mis à jour avec succès !`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onUpdate)} className="product-form-list">
        <img
          src={product.productImage}
          alt={product.productName}
          className="image-admin"
        />

        <label htmlFor={`productName-${product.productId}`} hidden>
          Nom du produit
        </label>
        <input type="hidden" {...register("productId")} />
        <input
          className="input-transparent"
          type="text"
          id={`productName-${product.productId}`}
          {...register("productName")}
        />

        <label htmlFor={`productDescription-${product.productId}`} hidden>
          Description du produit
        </label>
        <input
          className="input-transparent"
          type="text"
          id={`productDescription-${product.productId}`}
          {...register("productDescription")}
        />

        <label htmlFor={`productPrice-${product.productId}`} hidden>
          Prix du produit
        </label>
        <input
          className="input-transparent"
          type="number"
          id={`productPrice-${product.productId}`}
          {...register("productPrice")}
        />

        <label htmlFor={`productStock-${product.productId}`} hidden>
          Stock du produit
        </label>
        <input
          className="input-transparent"
          type="number"
          id={`productStock-${product.productId}`}
          {...register("productStock")}
        />

        <label htmlFor={`productDeleted-${product.productId}`} hidden>
          Statut du produit
        </label>
        <select
          className="input-transparent"
          id={`productDeleted-${product.productId}`}
          {...register("productDeleted")}
        >
          <option value="true">Disponible</option>
          <option value="false">Indisponible</option>
        </select>

        <label htmlFor={`productCategory-${product.productId}`} hidden>
          Catégorie du produit
        </label>
        <input
          className="input-transparent"
          type="text"
          id={`productCategory-${product.productId}`}
          {...register("productCategory")}
        />

        <label htmlFor={`productImage-${product.productId}`} hidden>
          URL de l'image
        </label>
        <input
          className="input-transparent"
          type="text"
          id={`productImage-${product.productId}`}
          {...register("productImage")}
        />

        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default ProductUpdateList;
