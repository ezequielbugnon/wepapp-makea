'use client';

import { createContext } from 'react';
import {IForm} from '../../interfaces/form'
import { ICatalogue } from '@/interfaces/catalogue';

export interface LoginContextProps {
    token: any,
    orders: any,
    loading: any,
    login: (data: IForm) => void,
    register: (data: IForm) => void;
    sendOrder : (sendData :ICatalogue[]) => void;
    loadUser: () => void;
    getOrders : () => void;
    logout: () => void;
}


const loginContext = createContext({} as LoginContextProps);

export default loginContext;