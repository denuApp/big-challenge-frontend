import { FC, useReducer } from 'react';
import { AuthContext, authReducer } from './';

export interface AuthState {
    user: null,
    error: null,
}

interface AuthProviderProps {
   children: React.ReactNode;
}

const Auth_INITIAL_STATE: AuthState = {
    user: null,
    error: null,
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

const [state, dispatch] = useReducer(authReducer,Auth_INITIAL_STATE);

    const login = (email: string, password: string) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'jj' && password === 'jj') {
                    dispatch({ type: 'AUTH - LOGIN_SUCCESS', payload: { user: { email } } });
                    resolve();
                } else {
                    dispatch({ type: 'AUTH - LOGIN_FAILURE' });
                    reject();
                }
            }, 1000);
        });
    }

    const signout = () => {
        dispatch({ type: 'AUTH - SIGNOUT_SUCCESS' });
    }

   return (
       <AuthContext.Provider value={{
          property: false
       }}>
          { children }
       </AuthContext.Provider>
   );
}