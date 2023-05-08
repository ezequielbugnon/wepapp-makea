"use client";

import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/navbar/navbar";
import GridCard from "../components/gridCard/gridCard";
import styles from "./page.module.css";
import Spinner from "../components/spinner/spinner";
import { ICatalogue } from "@/interfaces/catalogue";
import LoginContext from "@/context/loginContext/loginContext";
import Link from "next/link";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<ICatalogue[]>([]);

  const loginContext = useContext(LoginContext);
  const { token, loadUser, sendOrder } = loginContext;

  useEffect(() => {
    const seting = async () => {
      await loadUser();
    };

    seting();
    setLoading(false);
  }, []);

  useEffect(() => {
    const storeCart = JSON.parse(localStorage.getItem("cart") || "{}");
    if (Object.entries(storeCart).length !== 0) {
    const deleteDuplicates = storeCart.setData.reduce(
      (acumulador: any, valorActual: any) => {
        const elementExist = acumulador.find(
          (eleme: ICatalogue) => eleme.id === valorActual.id
        );
        if (elementExist) {
          return acumulador.map((elem: any) => {
            if (elem.id === valorActual.id) {
              if (elem["cantidad"] === undefined) {
                return {
                  ...elem,
                  cantidad: 2,
                };
              }
              return {
                ...elem,
                cantidad: ++elem.cantidad,
              };
            }
            return elem;
          });
        }

        return [...acumulador, valorActual];
      },
      []
    );
    setCart(deleteDuplicates);
    }else{
      setCart([])
    }
    setLoading(false);
  }, []);

  const handlerOrder = () => {
    sendOrder(cart)
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Navbar />
      <div className={styles.title}>
        <div>
          <h1>Carrito</h1>
          {token && cart.length > 0 && (
            <button onClick={() => handlerOrder() }>Realizar el pedido</button>
          )}
          {token && cart.length === 0 && (
            <Link href={`/login`}>Mira nuestros productos</Link>
          )}
          {!token && (
            <Link href={`/login`}>Logueate para hacer tu pedido</Link>
          )}
        </div>
      </div>
      <GridCard data={cart} setDispatchCart={setCart} text="cart" />
    </main>
  );
};

export default Cart;
