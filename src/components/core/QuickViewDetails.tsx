import React from "react";
import { useEffect, useState } from "react";
import { startTransition } from "react";
import { article$ } from "../../components/core/ProductsList";
import * as Types from "../../@types/Types";

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
    <div>
      <h1>Quick View Details</h1>
      <p>Article ID: {article.productId}</p>
    </div>
  );
};

export default QuickViewDetails;
