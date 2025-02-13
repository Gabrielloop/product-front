import React, { startTransition, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { Filters } from "../../@types/Types";
import { getApiBack } from "api/getApiBack";
import { useTransition } from "react";

export const filters$ = new BehaviorSubject<Filters>({}); // Observable pour les filtres

const ProductsFilters: React.FC = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    filters$.next(newFilters); // Met à jour l'observable pour les filtres
  };
  const handleCategoryClick = (category: string) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    filters$.next(newFilters); // Met à jour l'observable pour les filtres
  };

  const fetchData = async () => {
    startTransition(async () => {
      try {
        let response;
        response = await getApiBack("/product/categories");
        if (response) {
          setCategories(response);
          console.log("categories", response);
        }
      } catch (error) {}
    });
  };

  // switch sur category

  const imgLink = (category: string) => {
    switch (category) {
      case "all":
        return "https://via.placeholder.com/150";
      case "ball":
        return "https://www.pokepedia.fr/images/b/b1/Miniature_Pok%C3%A9_Ball_EV.png";
      case "soin":
        return "https://www.pokepedia.fr/images/c/ce/Miniature_Potion_EV.png";
      case "baie":
        return "https://www.pokepedia.fr/images/f/f5/Miniature_Baie_Oran_EV.png";
      default:
        return "https://via.placeholder.com/150";
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="filters">
      <div>
        <label>
          <div onClick={() => handleCategoryClick("all")}>
            tous les articles
          </div>
        </label>
        {categories.map((category) => (
          <label key={category}>
            <div
              onClick={() => handleCategoryClick(category)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={imgLink(category)}
                style={{
                  height: "20px",
                }}
              />
            </div>
          </label>
        ))}
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
