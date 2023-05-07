import { useState, useContext } from 'react'

import {IForm} from '../interfaces/form';
import LoginContext from '../context/loginContext/loginContext';
import { toast } from 'react-toastify';

const useForm = ( signIn?: boolean) => {
    const loginContext = useContext(LoginContext);
    const { login, register } = loginContext;
 
    const [useForm, setUseForm] =  useState<IForm>({
        name: '',
        email: '',
    })

    const {name, email} = useForm;

    const handleChange = (event: any) => {
        setUseForm({
            ...useForm,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!validationEmail(email)){
            return toast.error('Email not valid')
        }

        if(signIn){
            if(name === null || name === undefined){
                return toast.error('name is required')
            }
           register({name, email})
        }else{
          login({email})
        }
        
    }

    const validationEmail = (email:string):boolean => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(email) return re.test(email)

        return false
    }

    return {
        name,
        email,
        handleChange,
        handleSubmit
    }
}

export default useForm;