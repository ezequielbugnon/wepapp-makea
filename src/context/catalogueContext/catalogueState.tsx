"use client";

import React, { useReducer, useEffect } from "react";
import axios from "axios";
import catalogueContext from "./catalogueContext";
import catalogueReducer from "./catalogueReducer";
import { IForm } from "../../interfaces/form";
import { toast, ToastContainer } from "react-toastify";
import { ICatalogue } from "@/interfaces/catalogue";

type Props = {
  children: React.ReactNode;
};

const CatalogueState = (props: Props) => {
  const initialState = {
    data: null,
    filter: null,
  };

  const [state, dispatch] = useReducer(catalogueReducer, initialState);

  const getCatalogue = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/catalogue`);
      dispatch({
        type: "CHARGE",
        payload: response.data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const Getfilter = async (data: ICatalogue[], term: string) => {
    if (term === "todo") {
      dispatch({
        type: "FILTER",
        payload: data,
      });
      return;
    }
    const dataFilter = data.filter((e) => e.category === term);

    dispatch({
      type: "FILTER",
      payload: dataFilter,
    });
  };

  return (
    <catalogueContext.Provider
      value={{
        data: state.data,
        filter: state.filter,
        getCatalogue,
        Getfilter,
      }}
    >
 
      {props.children}
    </catalogueContext.Provider>
  );
};

export default CatalogueState;
