import { getApiBack } from "api/getApiBack";
import React, { useTransition } from "react";
import { Product, Filters } from "../../@types/Types";
import { useNavigate } from "react-router-dom";
import { BehaviorSubject } from "rxjs";
import ProductLine from "./ProductLine";
import { useEffect, useState } from "react";
import { filters$ } from "./ProductsFilters";

// Observables
export const article$ = new BehaviorSubject<Product>({} as Product); // Observable pour l'affichage du produit en Quickview

const ProductsList: React.FC = () => {
  const [hover, setHover] = React.useState<number>(0);
  const [listFromApi, setListFromApi] = React.useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({} as Filters);

  // Utilisation d'un Observable pour la gestion des filtres

  useEffect(() => {
    const subscription = filters$.subscribe((filter) => {
      setFilters(filter);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchData = () => {
    startTransition(async () => {
      let response = await getApiBack("/product/all");
      startTransition(() => {
        setListFromApi(response);
      });
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return isPending ? (
    <div>Loading...</div>
  ) : (
    <div>
      {filters.productName && <h2>Recherche: {filters.productName}</h2>}
      {filters.category && <h2>Catégorie: {filters.category}</h2>}
      <table>
        <thead>
          <tr>
            <td>
              <b>Article</b>
            </td>
            <td>
              <b>Prix</b>
            </td>
            <td>
              <b>(Stock)</b>
            </td>
            <td>
              <b>Panier</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {listFromApi.map((product) => (
            <tr
              className={hover === product.productId ? "line-hover" : ""}
              key={product.productId}
              onClick={() => {
                navigate("../product/" + product.productId);
              }}
              onMouseOver={() => {
                article$.next(product); // Met à jour l'observable pour le Quickview
                setHover(product.productId);
              }}
            >
              <ProductLine {...product} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
