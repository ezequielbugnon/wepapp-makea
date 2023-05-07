'use client';

import { createContext } from 'react';
import {IForm} from '../../interfaces/form'

export interface LoginContextProps {
    token: string,
    login: (data: IForm) => void,
    addToken: (data : string) => void,
    register: (data: IForm) => void;
    logout: () => void;
}


const loginContext = createContext({} as LoginContextProps);

export default loginContext;