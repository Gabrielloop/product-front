import { getApiBack } from 'api/getApiBack';
import React, { startTransition, useTransition } from 'react';
import { Product } from '../@types/Types';

const ProductsList: React.FC = () => {
    const [listFromApi, setListFromApi] = React.useState<Product[]>([]);
    const [isPending, startTransition] =useTransition()

    const fetchData = () => {
        startTransition(async ()  => {
                let response = await getApiBack("/product/all");
            startTransition(() =>{
                setListFromApi(response);
            })
        });
        };

    React.useEffect(() => {
       fetchData();
    }, []);
      
    return (
        isPending?
        <div>Loading...</div>:
        
        <div>
            <h2>Products List</h2>
            <ul>
                {listFromApi.map(product => (
                    <li key={product.productId}>
                        {product.productName} - ${product.productPrice}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsList;