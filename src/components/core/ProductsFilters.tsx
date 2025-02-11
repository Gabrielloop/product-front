import React, { useState } from 'react';

interface ProductsFiltersProps {
    onFilterChange: (filters: { [key: string]: string }) => void;
}

const ProductsFilters: React.FC<ProductsFiltersProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className='filters'>
            <div>
                <label>
                    Category:
                    <input type="text" name="category" value={filters.category || ''} onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <label>
                    Price Range:
                    <input type="text" name="priceRange" value={filters.priceRange || ''} onChange={handleInputChange} />
                </label>
            </div>
        </div>
    );
};

export default ProductsFilters;