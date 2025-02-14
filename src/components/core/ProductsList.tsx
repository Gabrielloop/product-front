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
  const [filters, setFilters] = useState<Filters>({} as Filters);

  // Utilisation d'un Observable pour la gestion des filtres

  useEffect(() => {
    const subscription = filters$.subscribe((filter) => {
      setFilters(filter);
      fetchData(filter);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async (filtersProp: Filters) => {
    startTransition(async () => {
      // Gestion des filtres de recherche
      const category = filtersProp.category ?? "all";
      const productName = filtersProp.productName ?? "";

      try {
        let response;
        if (productName || category !== "all") {
          response = await getApiBack(
            `/product/filter/${category}/${productName}`
          );
        } else {
          response = await getApiBack("/product/allAble");
        }
        setListFromApi(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    });
  };

  return isPending ? (
    <div>Loading...</div>
  ) : (
    <div id="products-list">
      <h2>Nos produits</h2>
      {filters.productName && <h3>Recherche: {filters.productName}</h3>}
      {filters.category && filters.category != "all" && (
        <h3>Catégorie: {filters.category}</h3>
      )}

      <table className="products-table">
        <thead>
          <tr>
            <th></th>
            <th>
              <b>Article</b>
            </th>
            <th>
              <b>Prix</b>
            </th>
            <th>
              <b>Panier</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {listFromApi.map((product) => (
            <tr
              className={hover === product.productId ? "line-hover" : ""}
              key={product.productId}
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
