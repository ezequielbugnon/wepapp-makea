'use client';

import React, {useReducer, useEffect} from 'react';
import axios from 'axios';
import loginContext from './loginContext';
import loginReducer from './loginReducer';
import {IForm} from '../../interfaces/form'
import toast from 'react-hot-toast';
import { ICatalogue } from '@/interfaces/catalogue';

type Props = {
    children:  React.ReactNode,
};

const LoginState = (props: Props) => {
    const initialState = {
        token: null,
        orders: null,
        loading: null,
    }

    const [state, dispatch] = useReducer(loginReducer, initialState);


    const login = async (data: IForm) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/login`, data);
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/register`, data);
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

    const sendOrder = async (sendData :ICatalogue[]) => {
        
        try {
            const tk = localStorage.getItem('token')
            const getProfile = await axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/profile`, {
                headers: {
                    ' Authorization': `Bearer ${tk}`
                }
            });

            const order = sendData.map((e:ICatalogue) => { 
               return { catalogueId: e.id, userId: getProfile.data.sub}
            })

           await axios({
                method: 'post',
                url: `${process.env.NEXT_PUBLIC_URL}/order/order-multiple`,
                data: order,
                headers: {'Authorization': `Bearer ${tk}`}
              })
              toast.success('pedido enviado correctamente')

        } catch (error) {
            if (axios.isAxiosError(error)) { 
                console.log(error.response?.data.message)
                toast.error(error.response?.data.message[0])    
            }   
        }
    }

    const getOrders = async() => {
        dispatch({
            type: 'LOADING',
            payload: true
        })
        try {
            const tk = localStorage.getItem('token')
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/profile`, {
                headers: {
                    ' Authorization': `Bearer ${tk}`
                }
            });
           
            const orders = await axios.get(`${process.env.NEXT_PUBLIC_URL}/order/user/${data.sub}`, {
                headers: {
                    ' Authorization': `Bearer ${tk}`
                }
            });

            console.log(orders)

            dispatch({
                type: 'ORDERS',
                payload: orders.data
            })
            
        } catch (error) {
            if (axios.isAxiosError(error)) { 
                console.log(error.response?.data.message)
                toast.error(error.response?.data.message)    
            }   
        }

        dispatch({
            type: 'LOADING',
            payload: false
        })
    }

    const loadUser = () => {
        dispatch({
            type: 'LOADING',
            payload: true
        })
        const token =  localStorage.getItem('token')
        if (token) {
            dispatch({
                type: 'AUTHENTICATED',
                payload: token
            })
        }

        dispatch({
            type: 'LOADING',
            payload: false
        })
    }

    const logout = () => {
        localStorage.removeItem("token")
        dispatch({
            type: 'AUTHENTICATED',
            payload: null
        })

        dispatch({
            type: 'LOADING',
            payload: true
        })
    }


    return (
        <loginContext.Provider
            value={{
                token:state.token,
                orders: state.orders,
                loading: state.loading,
                login,
                register,
                sendOrder,
                loadUser,
                getOrders,
                logout,
            }}
        >
            {props.children}
        </loginContext.Provider>
    )
}

export default LoginState;