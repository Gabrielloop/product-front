import ProductsFilters from "components/core/ProductsFilters";
import ProductsList from "components/core/ProductsList";
import QuickViewDetails from "components/core/QuickViewDetails";
import React from "react";
import { Helmet } from "react-helmet-async";

const Products: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Pokémart : Nos produits</title>
      </Helmet>
      <ProductsFilters />
      <section id="products">
        <article>
          <h2>Products</h2>
          <ProductsList />
        </article>
        <article>
          <QuickViewDetails />
        </article>
      </section>
    </>
  );
};

export default Products;
