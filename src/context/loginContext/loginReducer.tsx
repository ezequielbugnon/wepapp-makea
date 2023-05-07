'use client';

type Action = 
    | { type: 'AUTHENTICATED', payload: string }
    | { type: 'ERROR', payload: string}


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
                message: action.payload
            }
        default:
            return state;
    }
}

export default UserReduder;