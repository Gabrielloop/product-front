import { formatCurrency } from "services/formatCurrency";
import {
  CommandProductWithQuantity,
  CommandLineProps,
} from "../../@types/Types";
import React, { startTransition, use, useEffect, useState } from "react";
import { getApiBack } from "../../api/getApiBack";
import { useNavigate } from "react-router-dom";

// Composant pour afficher une ligne de commande
// il y a un problème avec la récupération de la quantité des produits

const CommandLine: React.FC<CommandLineProps> = ({ command }) => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState<CommandProductWithQuantity[]>(
    []
  );

  const commandId = command.ordersId;

  // récupération des produits de la commande
  const fetchProducts = async (commandId: Number) => {
    startTransition(async () => {
      try {
        let response;
        // j'utilise mon API pour récupérer les produits de la commande
        const url = `/ordersProduct/orders/${commandId}`;
        response = await getApiBack(url);
        // j'enregistre les produits dans le state
        setProductList(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    });
  };

  // je récupère les produits de la commande à chaque changement de commande
  useEffect(() => {
    fetchProducts(commandId);
  }, [commandId]);

  return (
    <div className="command-block-line">
      <div className="command-line">
        <div>Commande n°{command.ordersId}</div>
        <div>Statut : {command.ordersStatus}</div>
        <div>Total : {formatCurrency(command.ordersTotal)}</div>
      </div>
      <div className="product-list-row">
        {(!productList || productList.length === 0) && (
          <div>Aucune commande</div>
        )}

        {productList?.length > 0 &&
          productList.map((product: CommandProductWithQuantity) => (
            <div
              key={product.productId}
              className="product-thumbnail"
              onClick={() => navigate(`/product/${product.productId}`)}
            >
              <div>
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="product-thumbnail-image"
                />
              </div>
              {/* <div>x {product.quantity}</div>  Je n'arrive pas à récupérer la valeur*/}
              <div>{product.productName}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommandLine;
