import { formatCurrency } from 'services/formatCurrency';
import { Command, Product } from '../../@types/Types';
import React, { startTransition, useState } from 'react';
import { getApiBack } from '../../api/getApiBack';

interface CommandLineProps {
    command: Command;
}


const CommandLine: React.FC<CommandLineProps> = ({ command }) => {
const [productList, setProductList] = useState<Product[]>([]);

const commandId= command.ordersId;

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




    return (
        <>
        <div className="command-line">
            <div>Commande n°{command.ordersId}</div>
            <div>Statut : {command.ordersStatus}</div>
            <div>Total : {formatCurrency(command.ordersTotal)}</div>
        </div>
        <div>
            {/* Il faut mettre le typage du retour de l'api à jour */}
        {productList.map((product:Product) => (
            <div key={product.productId}>
                <div>pdt {product.productName}</div>
                <div>{product.productPrice}</div>
            </div>
        ))
            }
        </div>
        </>
    );
};

export default CommandLine;