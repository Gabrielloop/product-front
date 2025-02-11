import ProductsFilters from 'components/core/ProductsFilters';
import ProductsList from 'components/core/ProductsList';
import React from 'react';

interface ProductsFiltersProps {
    onFilterChange: (filters: { [key: string]: string }) => void;
}


const Products: React.FC = () => {
    return (
        <div>
            {/* // filter on priceRange and category */}

            <ProductsFilters onFilterChange={(filters) => console.log(filters)}/>
            <h2>Products</h2>
            <ProductsList />
        </div>
    );
};

export default Products;