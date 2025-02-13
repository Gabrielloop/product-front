import ProductsFilters from "components/core/ProductsFilters";
import ProductsList from "components/core/ProductsList";
import QuickViewDetails from "components/core/QuickViewDetails";
import React from "react";

const Products: React.FC = () => {
  return (
    <>
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
