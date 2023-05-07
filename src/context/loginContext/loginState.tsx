'use client';

import React, {useReducer} from 'react';
import axios from 'axios';
import loginContext from './loginContext';
import loginReducer from './loginReducer';
import {IForm} from '../../interfaces/form'
import { toast } from 'react-toastify';

type Props = {
    children:  React.ReactNode,
};

const LoginState = (props: Props) => {
    const initialState = {
        token: null,
    }

    const [state, dispatch] = useReducer(loginReducer, initialState);

    const login = async (data: IForm) => {
        try {
            const response = await axios.post(`http://localhost:4000/auth/login`, data);
            console.log(response.data.access_token)
            localStorage.setItem('token', response.data.access_token)
            toast.success('usuario logueado')
            dispatch({
                type: 'AUTHENTICATED',
                payload: response.data.access_token
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
               toast.error(error.response?.data.message)
            }
        }    
    }

    const register = async (data: IForm) => {
        try {
            const response = await axios.post(`http://localhost:4000/auth/register`, data);
            localStorage.setItem('token', response.data.access_token)
            toast.success('usuario creado')
            dispatch({
                type: 'AUTHENTICATED',
                payload: response.data.access_token
            })
        } catch (error) {
            if (axios.isAxiosError(error)) { 
                console.log(error.response?.data.message)
                toast.error(error.response?.data.message[0])    
            }   
        }
      
    }

    const logout = async () => {
        try {
            
        } catch (error) {
            
        }
    }

    const addToken = (data : string) => {
        dispatch({
            type: 'AUTHENTICATED',
            payload: data
        })
    }

    return (
        <loginContext.Provider
            value={{
                token:state.token,
                login,
                register,
                logout,
                addToken
            }}
        >
            {props.children}
        </loginContext.Provider>
    )
}

export default LoginState;