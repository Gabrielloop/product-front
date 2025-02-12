import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../@types/Types";
import { useNavigate } from "react-router-dom";
import { getApiBack } from "../api/getApiBack";
import { useTransition } from "react";

const ProductDetails: React.FC = () => {
  const [productFromApi, setProductFromApi] = React.useState<Product>();
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  // Recuperation de l'id du produit depuis le lien
  const { productId } = useParams<{ productId: string }>();
  console.log("product id:", productId);

  const fetchData = () => {
    startTransition(async () => {
      let response = await getApiBack("/product/id/" + productId);
      startTransition(() => {
        setProductFromApi(response);
      });
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  console.log("product id:", productFromApi);

  return (
    <div>
      <h2>Product Details #</h2>
      {/* Add your product details content here */}
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h3>{productFromApi?.productName}</h3>
          <p>{productFromApi?.productDescription}</p>
          <p>{productFromApi?.productPrice}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
