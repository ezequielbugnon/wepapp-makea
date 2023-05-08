import React, { useContext, useEffect, useState } from "react";
import styles from "../../page.module.css";
import { FaHouseUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import useWindowSize from "@/hocks/useWindowSize";
import Link from "next/link";
import { usePathname, useRouter} from "next/navigation";
import LoginContext from "@/context/loginContext/loginContext";



export default function Navbar() {
  const { width } = useWindowSize();
  const router = usePathname();
  let tk
  const loginContext = useContext(LoginContext);
  const { token , loadUser, logout} = loginContext;
  const [loading, setLoading] = useState(true)
  const redirect = useRouter()

  useEffect(() => {
    const seting =async() => {
      await loadUser()
    }
    seting()
    setLoading(false)
   
  }, []);


  const handlerLogut = () => {
    logout()
    redirect.push("/")
  }


  const loadingHTML = () =>{ return <h1>...loading</h1>}
  

  const navdiv = () => {
    return width! < 760 ? (
      <nav className={styles.navbar}>
        <div>
          <Link href={`/`} style={{ color: router === "/" ? "white" : "" }}>
            <FaHouseUser />
            <h4>Home</h4>
          </Link>
        </div>
        <div>
          <Link
            href={`/cart`}
            style={{ color: router === "/cart" ? "white" : "" }}
          >
            <div className={styles.cart}>
              <FaShoppingCart />
              <h4>Carrito</h4>
            </div>
          </Link>
        </div>
        <div>
          <Link
            href={`/login`}
            style={{ color: router === "/login" ? "white" : "" }}
          >
            <div className={styles.cart}>
              <FaUser />
              <h4>Registro</h4>
            </div>
          </Link>
        </div>
      </nav>
    ) : (
      <nav className={styles.navbardesktop}>
        <div>
          <ul>
            <li>
              <Link href={`/`} style={{ color: router === "/" ? "white" : "" }}>
                INICIO
              </Link>
            </li>
          </ul>
          <ul>
            {token === null && (
              <li>
                <Link
                  href={`/register`}
                  style={{ color: router === "/register" ? "white" : "" }}
                >
                  REGISTRO
                </Link>
              </li>
            ) }
            {token === null  ? (
              <li>
                <Link
                  href={`/login`}
                  style={{ color: router === "/login" ? "white" : "" }}
                >
                  LOGIN
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  href={`/orders`}
                  style={{ color: router === "/orders" ? "white" : "" }}
                >
                  PEDIDOS
                </Link>
                <FaUser />
              </li>
            )}
              <li>
                <Link
                  href={`/cart`}
                  style={{ color: router === "/cart" ? "white" : "" }}
                >
                  CARRITO
                </Link>
                <FaShoppingCart />
              </li>
             {token !== null  && <li>
              <button onClick={()=> handlerLogut()}>Logout</button>
            </li>}
          </ul>

        </div>
      </nav>
    );
  };


  if(loading === false){
    return navdiv()
  }


  return loadingHTML()

}
