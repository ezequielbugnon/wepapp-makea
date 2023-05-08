"use client";

import React, {useContext, useEffect, useState} from "react";
import Navbar from "../components/navbar/navbar"
import GridCard from "../components/gridCard/gridCard";
import styles from './page.module.css';
import LoginContext from "@/context/loginContext/loginContext";
import Spinner from "../components/spinner/spinner";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';


export default function Orders() {
    const loginContext = useContext(LoginContext);
    const {getOrders, orders, loading, token, loadUser} = loginContext;
    const router = useRouter()

    useEffect(() => {
        loadUser()
    }, []);

  
    useEffect(() => {
        token === null && router.push("/");
    }, []);
    

    useEffect(() => {
        getOrders()
    }, []);

    if (loading) {
        return <Spinner />;
    }
 

    return  (
        <main>
            <Navbar />
            <div className={styles.title}>
                <div>
                    <h1>Orders Totales</h1>
                    {orders&& orders.map((e: any) => <p>{e.id}</p>)}
                    {!orders && <p>No hay pedidos</p>}
                </div>
            </div>
        </main>
    )
}