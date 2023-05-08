import React from "react";
import { ICatalogue } from "@/interfaces/catalogue";
import styles from "../../page.module.css";
import Image from "next/image";
import toast from 'react-hot-toast';

interface Props {
  data: ICatalogue[];
  text: string;
  setDispatchCart?: React.Dispatch<React.SetStateAction<any>>;
}

const GridCard = ({ data, text, setDispatchCart }: Props) => {

  const setCart = (e: ICatalogue) => {
    const storeCart = JSON.parse(localStorage.getItem("cart") || "{}");
    if (Object.entries(storeCart).length !== 0) {
      storeCart.setData.push(e);
      localStorage.setItem("cart", JSON.stringify(storeCart));
    } else {
      const setData = [];
      setData.push(e);
      const sendData = {
        setData,
      };
      localStorage.setItem("cart", JSON.stringify(sendData));
      
    }
    toast.success("Añadido al carrito")
  };

  const deleteCart = (e: ICatalogue) => {
    const deleteOne = data.map((d) => {
      if (d.id === e.id) {
        if (d["cantidad"] === undefined) {
          return;
        }
        if (d.cantidad === 1) {
          return;
        } else {
          return { ...d, cantidad: d.cantidad! - 1 };
        }
      }
      return d;
    });
    const deleteClean = deleteOne.filter((data: any) => data != undefined);
    setDispatchCart!(deleteClean);
    const sendData = {
      setData:deleteClean,
    };
    localStorage.setItem("cart", JSON.stringify(sendData));

    if(deleteClean.length === 0) {
      localStorage.removeItem("cart")
      return
    }
  };

  const changeHtml = (type: string) => {
    switch (type) {
      case "cart":
        return <p>No hay nada en carrito</p>;
      case "order":
        return <p>No hay pedidos realizados</p>;
      case "home":
        return <p>Lo sentimos ha ocurrido um problema</p>;
      default:
        return <p>Nada para mostrar</p>;
    }
  };

  return (
    <>
    <div className={styles.containerGrid}>
  
      <div className={styles.containerProducts}>
        {data.length === 0
          ? changeHtml(text)
          : data.map((e: ICatalogue) => {
              return (
                <div className={styles.cardProducts} key={e.id}>
                  <div className={styles.cardTitle}>
                    <h2>{e.name}</h2>
                    <h4> {e.category} </h4>
                  </div>

                  <div>
                    <Image
                      src="/muebles2.jpg"
                      alt="me"
                      width="300"
                      height="200"
                    />
                  </div>
                  <article className={styles.cardArticle}>
                    <p>{e.description}</p>
                  </article>
                  <div className={styles.cardContainerButton}>
                    {text === "home" && (
                      <button onClick={() => setCart(e)}>
                        Añadir al carrito
                      </button>
                    )}
                    {text === "cart" && (
                      <button onClick={() => deleteCart(e)}>X</button>
                    )}
                    {text === "cart" && (
                      <p>cantidad: {e.cantidad ? e.cantidad : 1}</p>
                    )}
                    <p>$ {e.price}</p>
                  </div>
                </div>
              );
            })}
      </div>
    
    </div>
   
    </>
  );
};

export default GridCard;
