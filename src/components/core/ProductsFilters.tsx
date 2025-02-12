import React, { useState } from "react";
import { BehaviorSubject } from "rxjs";
import { Filters } from "../../@types/Types";

export const filters$ = new BehaviorSubject<Filters>({}); // Observable pour les filtres

const ProductsFilters: React.FC = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    filters$.next(newFilters); // Met à jour l'observable pour les filtres
    console.log("filters:", newFilters);
  };
  const handleCategoryClick = (category: string) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    filters$.next(newFilters); // Met à jour l'observable pour les filtres
    console.log("filters:", newFilters);
  };

  return (
    <div className="filters">
      <div>
        <label>
          <div onClick={() => handleCategoryClick("")}>all</div>
        </label>
        <label>
          <div onClick={() => handleCategoryClick("ball")}>ball</div>
        </label>
        <label>
          <div onClick={() => handleCategoryClick("soin")}>soin</div>
        </label>
      </div>
      <div>
        <label>
          Recherche:
          <input
            type="text"
            name="productName"
            value={filters.productName || ""}
            onChange={handleInputChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ProductsFilters;
