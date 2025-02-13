import { formatCurrency } from "services/formatCurrency";
import {
  Command,
  CommandProduct,
  CommandProductWithQuantity,
} from "../../@types/Types";
import React, { startTransition, useEffect, useState } from "react";
import { getApiBack } from "../../api/getApiBack";

interface CommandLineProps {
  command: Command;
}

const CommandLine: React.FC<CommandLineProps> = ({ command }) => {
  const [productList, setProductList] = useState<CommandProductWithQuantity[]>(
    []
  );

  const commandId = command.ordersId;

  const fetchProducts = async (commandId: Number) => {
    startTransition(async () => {
      try {
        let response;
        const url = `/ordersProduct/orders/${commandId}`;
        response = await getApiBack(url);

        setProductList(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    });
  };

  useEffect(() => {
    fetchProducts(commandId);
  }, [commandId]);

  return (
    <>
      <div className="command-line">
        <div>Commande n°{command.ordersId}</div>
        <div>Statut : {command.ordersStatus}</div>
        <div>Total : {formatCurrency(command.ordersTotal)}</div>
      </div>
      <div>
        {(!productList || productList.length === 0) && (
          <div>Aucune commande</div>
        )}

        {productList?.length > 0 &&
          productList.map((product: CommandProductWithQuantity) => (
            <div key={product.productId}>
              <div>Produit #{product.productId}</div>
              <div>x {product.quantity}</div>
              <div>{product.productName}</div>
              <div>{formatCurrency(product.productPrice)}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommandLine;
