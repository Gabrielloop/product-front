import React, { useEffect, useState } from "react";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CartProps } from "../@types/Types";
import CartList from "components/core/CartList";
import EmptyCart from "layout/EmptyCart";
import { postApiBack } from "../api/postApiBack";
import { formatCurrency } from "services/formatCurrency";
import CommandList from "components/core/CommandList";
import { useContext } from "react";


export const cartObservable: BehaviorSubject<CartProps[]> = new BehaviorSubject<
  CartProps[]
>([]);



const Cart: React.FC = () => {
  const [localMail, setLocalMail] = useState<string>(localStorage.getItem("mailLocal") || "");
  const [localCart, setLocalCart] = useState<CartProps[]>([]);
  const [productsInCart, setProductsInCart] = useState<CartProps[]>([]);
  const [cartSize, setCartSize] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [mail, setMail] = useState<string>("");

  // récupération du panier dans le local storage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log("récupération du panier", cart);
    setLocalCart(cart);
    cartObservable.next(cart);
  }, []);




  // récupération du panier
  useEffect(() => {
    const subscription = cartObservable.subscribe((newCart) => {
      setProductsInCart(newCart);
      setCartSize(newCart.reduce((acc, item) => acc + item.quantity, 0));
      setCartTotal(
        newCart.reduce(
          (acc, item) => acc + item.quantity * item.product.productPrice,
          0
        )
      );
    });
    return () => subscription.unsubscribe();
  }, []);


  const handleMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const handleResetMail = () => {
  setLocalMail("");
  localStorage.removeItem("mailLocal");
};

  const handleOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    const products = productsInCart.map((product) => ({
      productId: product.product.productId,
      quantity: product.quantity,
      total: (product.quantity * product.product.productPrice).toFixed(2),
    }));

    const totalCommand = products.reduce((acc, item) => acc + parseFloat(item.total), 0);

    const requestData = {
      ordersUserEmail: mail,
      ordersStatus: "Validation",
      ordersTotal: totalCommand,
    };

    postApiBack("/orders/add", requestData)
      .then((response) => {
        // on ajoute les produits dans la base de données
        // on post les produits dans la base de données

        const requestProducts = products.map((product) => ({
          ordersId: response,
          productId: product.productId,
          quantity: product.quantity,
        }))
        
        postApiBack("/ordersProduct/add", requestProducts)
          .then((response) => {
            // on vide le panier
            cartObservable.next([]);
            // on enregistre le mail dans le local storage
            localStorage.setItem("mailLocal", mail);
            // on vide le panier
            localStorage.removeItem("cart");
            setLocalMail(mail);

          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération des données :",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  };

  {localMail ? console.log("localMail : ", localMail ) : console.log("localMail false : ", localMail )}

  return (
    <div>
      <div id="cart-list">
        <h2>Panier</h2>

        {cartSize === 1 && <span>{cartSize} Article</span>}
        {cartSize > 1 && <span>{cartSize} Articles</span>}

        {cartSize === 0 && <EmptyCart />}

        <div className="cart-item cart-header">
          <div></div>
          <div>
            <b>Article</b>
          </div>
          <div>
            <b>Prix</b>
          </div>
          <div>
            <b>Total</b>
          </div>
          <div>
            <b>Quantité</b>
          </div>
        </div>

        {productsInCart.map((product) => (
          <CartList key={product.product.productId} {...product} />
        ))}
        <h3>Total: {formatCurrency(cartTotal)}</h3>
      </div>
      
      <button onClick={() => cartObservable.next([])}>Vider le panier</button>
      <button onClick={handleResetMail}>Reset mail</button>
      <form onSubmit={handleOrder}>
      <input
      disabled={localMail ? true : false}
      onChange={handleMail}
      type="email" placeholder="votre mail"
      required
      defaultValue={localMail || ""} />
      <button type= "submit" >commander</button>
      </form>

        <CommandList mail={localMail} />

    </div>
  );
};
export default Cart;
