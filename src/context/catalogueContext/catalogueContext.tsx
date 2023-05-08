'use client';

import { createContext } from 'react';

export interface LoginContextProps {
    data: null,
    filter: null,
    getCatalogue: () => void;
    Getfilter: (data: any[], term: string) => void;
}


const loginContext = createContext({} as LoginContextProps);

export default loginContext;