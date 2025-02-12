import React, { useEffect, useState } from "react";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CartProps } from "../@types/Types";
import CartList from "components/core/CartList";
import EmptyCart from "layout/EmptyCart";

export const cartObservable: BehaviorSubject<CartProps[]> = new BehaviorSubject<
  CartProps[]
>([]);

const Cart: React.FC = () => {
  const [productsInCart, setProductsInCart] = useState<CartProps[]>([]);
  const [cartSize, setCartSize] = useState<number>(0);

  // récupération du panier
  useEffect(() => {
    const subscription = cartObservable.subscribe((newCart) => {
      setProductsInCart(newCart);
      setCartSize(newCart.reduce((acc, item) => acc + item.quantity, 0));
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h2>Panier</h2>
      {cartSize === 0 && <EmptyCart />}
      {cartSize === 1 && <span>{cartSize} Article</span>}
      {cartSize > 1 && <span>{cartSize} Articles</span>}
      <ul>
        {productsInCart.map((product) => (
          <CartList key={product.product.productId} {...product} />
        ))}
      </ul>
    </div>
  );
};
export default Cart;
