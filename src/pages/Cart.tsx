import React, { useEffect, useState } from "react";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CartProps, Command } from "../@types/Types";
import CartList from "components/core/CartList";
import EmptyCart from "layout/EmptyCart";
import { postApiBack } from "../api/postApiBack";
import { formatCurrency } from "services/formatCurrency";
import { useContext } from "react";
import { AuthContext } from "auth/AuthContext";
import FormLogin from "components/core/FormLogin";
import { Helmet } from "react-helmet-async";

export const cartObservable: BehaviorSubject<CartProps[]> = new BehaviorSubject<
  CartProps[]
>([]);

const Cart: React.FC = () => {
  const [localMail, setLocalMail] = useState<string>(
    localStorage.getItem("mailLocal") || ""
  );
  const [localCart, setLocalCart] = useState<CartProps[]>([]);
  const [productsInCart, setProductsInCart] = useState<CartProps[]>([]);
  const [cartSize, setCartSize] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext?.isLoggedIn;
  const loginUserRole = authContext?.loginUserRole;
  const loginUserEmail = authContext?.loginUserEmail;
  const [lastCommand, setLastCommand] = useState<Command>();

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

  const handleOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    const products = productsInCart.map((product) => ({
      productId: product.product.productId,
      quantity: product.quantity,
      total: (product.quantity * product.product.productPrice).toFixed(2),
    }));

    const totalCommand = products.reduce(
      (acc, item) => acc + parseFloat(item.total),
      0
    );

    const requestData = {
      ordersUserEmail: loginUserEmail,
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
        }));

        postApiBack("/ordersProduct/add", requestProducts)
          .then((response) => {
            // on vide le panier

            cartObservable.next([]);

            // on vide le panier
            localStorage.removeItem("cart");
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération des données :",
              error
            );
          });
        // mise à jour de la dernière commande
        setLastCommand({
          ordersId: response,
          ordersUserEmail: loginUserEmail || "",
          ordersStatus: "Validation",
          ordersTotal: totalCommand,
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  };

  // on affiche le resultat de la commande à l'utilisateur
  useEffect(() => {
    if (lastCommand) {
      alert(
        `Votre commande a été enregistrée sous le numéro ${
          lastCommand.ordersId
        } pour un montant de ${formatCurrency(lastCommand.ordersTotal)}`
      );
    }
  }, [lastCommand]);

  return (
    <>
      <Helmet>
        <title>Pokémart : Panier</title>
      </Helmet>
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

        {isLoggedIn ? (
          <form onSubmit={handleOrder}>
            <button type="submit">commander</button>
            <br />
            Mail : {loginUserEmail}
          </form>
        ) : (
          <FormLogin />
        )}

        {lastCommand && (
          <div id="last-command">
            <h2>Dernière commande en attente de validation</h2>
            <p>
              Commande n° {lastCommand.ordersId} pour un montant de{" "}
              {formatCurrency(lastCommand.ordersTotal)}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default Cart;
