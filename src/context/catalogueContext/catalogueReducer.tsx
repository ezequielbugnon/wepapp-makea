'use client';

import { ICatalogue } from "@/interfaces/catalogue";

type Action = 
    | { type: 'CHARGE', payload: [] }
    | { type: 'ERROR', payload: [] }
    | { type: 'FILTER', payload: ICatalogue[]}


const CatalogueReduder = (state: any, action: Action) => {
    switch(action.type){
        case 'CHARGE':
            return{
                ...state,
                data: action.payload 
            }
        case 'ERROR':
            return{
                ...state,
                data: null,
                filter: null,
            }
        case 'FILTER':
                return{
                    ...state,
                    filter: action.payload,
                }
        default:
            return state;
    }
}

export default CatalogueReduder;