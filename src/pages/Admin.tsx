import { getApiBack } from "../api/getApiBack";
import { Command, LoginFormInput, Product } from "../@types/Types";
import React, { startTransition, use, useEffect, useState } from "react";
import CommandLine from "components/core/CommandLine";
import { useForm, SubmitHandler } from "react-hook-form";
import { putApiBack } from "../api/putApiBack";
import ProductUpdateList from "components/core/ProductUpdateList";
import ProductAddForm from "components/core/ProductAddForm";

const Admin: React.FC = () => {
  const [commandList, setCommandList] = useState<Command[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [mailList, setMailList] = useState<string[]>([]);
  const [mail, setMail] = useState<string>("");
  const [productUpdated, setProductUpdated] = useState<Product | null>(null);

  const fetchData = async (mail: string) => {
    startTransition(async () => {
      try {
        let response;
        if (mail !== "all") {
          response = await getApiBack(`/orders/${mail}`);
        } else {
          response = await getApiBack("/orders/all");
        }
        setCommandList(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    });
  };

  const fetchEmail = async () => {
    startTransition(async () => {
      try {
        let response;
        response = await getApiBack("/orders/emails");
        setMailList(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    });
  };

  const fetchProducts = async () => {
    startTransition(async () => {
      try {
        let response;
        response = await getApiBack("/product/all");
        setProductList(response);
        console.log("product list ", response);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    });
  };

  // mise à jour de la liste des mails
  useEffect(() => {
    fetchEmail();
  }, []);

  const handleMailChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      e.target.value === "" ||
      e.target.value === "all" ||
      e.target.value === null ||
      e.target.value === undefined
    ) {
      setMail("");
      fetchData("all");
    } else {
      setMail(e.target.value);
      fetchData(e.target.value);
    }
  };

  return (
    <section className="admin">
      <h2>Administration</h2>
      <article>
        <h3>Liste des commandes</h3>
        <select onChange={handleMailChange}>
          <option value="">Choisir un mail</option>
          {mailList.map((mail) => (
            <option key={mail} value={mail}>
              {mail}
            </option>
          ))}
        </select>
        <div className="command-list">
          {commandList.map((command: Command) => (
            <CommandLine key={command.ordersId} command={command} />
          ))}
        </div>
      </article>
      <article>
        <h3>Liste des produits</h3>
        <ProductAddForm />
        <button onClick={fetchProducts}>Charger les produits</button>
        <ProductUpdateList productList={productList} />
      </article>
    </section>
  );
};

export default Admin;
