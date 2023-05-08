'use client';

type Action = 
    | { type: 'AUTHENTICATED', payload: any }
    | { type: 'ERROR', payload: string}
    | { type: 'ORDERS', payload: any}
    | { type: 'LOADING', payload: any}


const UserReduder = (state: any, action: Action) => {
    switch(action.type){
        case 'AUTHENTICATED':
            return{
                ...state,
                token: action.payload 
            }
        case 'ERROR':
            return{
                ...state,
                token: null,
            }
        case 'ORDERS':
            return{
                ...state,
                orders: action.payload
            }
        case 'LOADING':
            return{
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}

export default UserReduder;