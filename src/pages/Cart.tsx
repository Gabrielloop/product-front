import React, { useEffect, useState } from "react";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CartProps } from "../@types/Types";
import CartList from "components/core/CartList";

export const cartObservable: BehaviorSubject<CartProps[]> = new BehaviorSubject<
  CartProps[]
>([]);

const Cart: React.FC = () => {
  const [products, setProducts] = useState<CartProps[]>([]);

  // récupération du panier
  useEffect(() => {
    const subscription = cartObservable.subscribe((newCart) => {
      setProducts(newCart);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {products.map((product) => (
          <CartList key={product.articleId} {...product} />
        ))}
      </ul>
    </div>
  );
};
export default Cart;
