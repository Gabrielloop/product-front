import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../@types/Types";
import { useNavigate } from "react-router-dom";
import { getApiBack } from "../api/getApiBack";
import { useTransition } from "react";
import DetailedProduct from "components/core/DetailedProduct";
import { Helmet } from "react-helmet-async";

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

  const title = productFromApi?.productName
    ? `Pokémart : ${productFromApi.productName}`
    : "Pokémart";

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h2>{productFromApi?.productName}</h2>

      {isPending ? (
        <div>Loading...</div>
      ) : (
        productFromApi && <DetailedProduct product={productFromApi} />
      )}
    </div>
  );
};

export default ProductDetails;
