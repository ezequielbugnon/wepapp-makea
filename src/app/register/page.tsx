"use client";

import React, { useEffect, useContext, useState } from "react";
import LoginContext from "../../context/loginContext/loginContext";
import { useRouter } from "next/navigation";
import CardForm from "../components/cardForm/cardForm"
import useForm from '../../hocks/useForm';
import Spinner from "../components/spinner/spinner";

export default function Register() {
  const loginContext = useContext(LoginContext);
  const { token, loadUser } = loginContext;
  const router = useRouter();

  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const seting =async() => {
      await loadUser()
    }

    seting()
    setLoading(false)
   
  });

  useEffect(() => {
    token !== null && router.push("/");
  });



  const { 
    email,
    name,
    handleChange,
    handleSubmit,
  } = useForm(true)

  if(loading) {
    return <Spinner />
  }


  return token !== null ? (
    null
  ) : (
      <CardForm title="REGISTRATE" url="login">
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
                <input 
                    type="text"
                    placeholder= "name"
                    onChange={e => handleChange(e)}
                    value={name}
                    name="name"
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
