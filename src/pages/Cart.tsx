import React, { useEffect, useState } from "react";
import { Observable, of } from "rxjs";

interface Product {
  id: number;
  name: string;
  price: number;
}

export const cartObservable: Observable<Product[]> = of([
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
]);

const Cart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const cartObservable: Observable<Product[]> = of([
      { id: 1, name: "Product 1", price: 10 },
      { id: 2, name: "Product 2", price: 20 },
      { id: 3, name: "Product 3", price: 30 },
    ]);

    const subscription = cartObservable.subscribe(setProducts);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
