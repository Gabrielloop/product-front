import React from "react";
import { CartProps } from "../../@types/Types";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { getApiBack } from "../../api/getApiBack";
import { Product } from "../../@types/Types";
import CartSelector from "./CartSelector";

const CartList: React.FC<CartProps> = ({ articleId, quantity, stock }) => {
  // Récupération depuis l'API des informations du produit

  const [productFromApi, setProductFromApi] = React.useState<Product>();
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const fetchData = () => {
    startTransition(async () => {
      let response = await getApiBack("/product/id/" + articleId);
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
    <li key={productFromApi?.productId}>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("../product/" + productFromApi?.productId);
        }}
      >
        {productFromApi?.productName}
      </span>
      - {quantity}
      <CartSelector stock={stock} articleId={articleId} />
    </li>
  );
};

export default CartList;
