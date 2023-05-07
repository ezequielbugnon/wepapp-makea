"use client";

import React, { useEffect, useContext } from "react";

import LoginContext from "../../context/loginContext/loginContext";
import { useRouter } from "next/navigation";
import CardForm from "../../components/cardForm/cardForm"
import useForm from '../../hocks/useForm';


export default function Login() {
  const loginContext = useContext(LoginContext);
  const { token, addToken} = loginContext;
  const router = useRouter();
  const tk = localStorage.getItem('token')


  useEffect(() => {
    token !== null && router.push("/");
  }, [token]);

  useEffect(() => {
    if(tk !== null) addToken(tk)
  }, []);

  const { 
    email,
    handleChange,
    handleSubmit,
  } = useForm(false)

  return token !== null || tk !== null ? (
    null
  ) : (
      <CardForm title="LOGUEATE" url="register">
          <form action="">
            <div>
                <input 
                    type="email"
                    placeholder= "email"
                    onChange={e => handleChange(e)}
                    value={email}
                    name="email"
                 />
            </div>
            <div>
                <button 
                    onClick={handleSubmit}
                >Send</button>
            </div>
          </form>
      </CardForm>
  );
}
