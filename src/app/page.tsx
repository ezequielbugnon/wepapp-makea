'use client';

import React, { useEffect, useContext } from "react";
import LoginContext from "../context/loginContext/loginContext";
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  const loginContext = useContext(LoginContext);
  const {addToken} = loginContext;

  useEffect(() => {
    const tk = localStorage.getItem('token')
    if(tk !== null) addToken(tk)
  }, []);


  return (
    <main className={styles.main}>
      <h1>Dardo</h1>
    </main>
  )
}
