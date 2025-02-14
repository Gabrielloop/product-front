import React from "react";
import { useEffect, useState } from "react";
import { startTransition } from "react";
import { article$ } from "../../components/core/ProductsList";
import * as Types from "../../@types/Types";
import DetailedProduct from "./DetailedProduct";

const QuickViewDetails: React.FC = () => {
  const [article, setArticle] = useState<Types.Product>({} as Types.Product);

  // Utilisation d'un Observable pour l'affichage du produit en Quickview

  useEffect(() => {
    const subscription = article$.subscribe((product) => {
      setArticle(product);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (article.productId === undefined)
    return <div>Passez la souris sur un produit pour voir les détails.</div>;

  return (
    <div id="quickview-details">
      <h2>{article.productName}</h2>
      <DetailedProduct product={article} />
    </div>
  );
};

export default QuickViewDetails;
