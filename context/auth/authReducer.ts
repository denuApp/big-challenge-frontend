import { AuthState } from './';


type AuthActionType = 
    | { type: 'LOGIN_SUCCESS', payload: {  user: User } }
    | { type: 'LOGIN_FAILURE', payload: { error: string } }
    | { type: 'LOGOUT' }
    | { type: 'REGISTER_SUCCESS', payload: { user: User } }
    | { type: 'REGISTER_FAILURE', payload: { error: string } }
    


export const authReducer = ( state: AuthState, action: AuthActionType): AuthState => {

    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: action.payload.error
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                user: action.payload.user
            };
        case 'REGISTER_FAILURE':
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;


   

}