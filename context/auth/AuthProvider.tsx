import { FC, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '../../interfaces';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export interface AuthState {
    isLoggedIn: boolean,
    user?: IUser,
    token?: string,
}

interface AuthProviderProps {
   children: React.ReactNode;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
    token: '',
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );
    const { data, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if ( status === 'authenticated' ) {
        dispatch({ type: '[Auth] - Login', payload: data?.user as IUser })
      }
    
    }, [ status, data ])


    const signup = async( name: string, email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {
        try {
            //ver como hacer con axios?
            const { data } = await tesloApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    const login = async( email: string, password: string ): Promise<boolean> => {

        try {
            //ver como hacer el axios?
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            return false;
        }

    }


    const logout = () => {
        dispatch({ type: '[Auth] - Logout' });
    }

   return (
       <AuthContext.Provider value={{
           ...state,

              //Methods
            signup,
            login,
            logout,
       }}>
          { children }
       </AuthContext.Provider>
   );

}
