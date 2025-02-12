import React, { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { cartObservable } from "../../pages/Cart";

const CartSelector: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const subscription: Subscription = cartObservable.subscribe((newCart) => {
      setCart(newCart);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CartSelector;
