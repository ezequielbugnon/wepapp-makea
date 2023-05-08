"use client";

import React, {useContext, useState, useEffect} from "react";
import styles from "./page.module.css";
import Navbar from "./components/navbar/navbar";
import { FaList } from "react-icons/fa";
import GridCard from "./components/gridCard/gridCard";
import CatalogueContext from "../context/catalogueContext/catalogueContext"
import Spinner from "./components/spinner/spinner";


export default function Home() {

  const catalogueContext = useContext(CatalogueContext);
  const { data, getCatalogue, Getfilter, filter} = catalogueContext;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCatalogue()
    setLoading(false)
   
  }, []);


  const options = [
    {value: 'todo', text: '--Elija una opcion--'},
    {value: 'hogar', text: 'Hogar'},
    {value: 'jardin', text: 'Jardin'},
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event: any) => {
    setSelected(event.target.value)
    Getfilter(data!, event.target.value)
  };


  if(loading) {
    return  <Spinner/>
  }

  return (

    <main className={styles.main}>

      <Navbar />
      <div className={styles.selectContainer}>
        <div>
          <div className={styles.category}>
            <h4>Categorias</h4>
            <FaList />
          </div>
          <div className={styles.select}>
            <select onChange={(e) => handleChange(e)} value={selected}>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {data !== null && filter === null && <GridCard data={data} text="home"/>}
      {filter !== null && data !== null && <GridCard data={filter} text="home"/>}
 
    </main>
  );
}
