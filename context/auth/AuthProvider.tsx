import { FC, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '../../interfaces';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import bigApi from '../../config/headers';
import axios from 'axios';
import bigNoTokenApi from '../../config/headerNoToken';

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

    //axios. getuser para tener user que esta logueado

    const signup = async( name: string, email: string, password: string, role: string ): Promise<{hasError: boolean; message?: string}> => {
        try {
            //ver como hacer con axios?
            const { data } = await bigNoTokenApi().post('register-user', { 'name': name, 'email': email, 'password': password, 'roles': role });
            const { token, user } = data;
            dispatch({ type: '[Auth] - Login', payload: user });
            localStorage.setItem('token', token);
            if (role === "patient") {
                setTimeout(() => {
                  router.push("/patient/dashboard");
                }, 2000);
              } else {
                setTimeout(() => {
                  router.push("/doctor/allSubmissions");
                }, 2000);
              }
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response.data.message
                }
            }

            return {
                hasError: true,
                message: 'User could not be created - try again'
            }
        }
    }

    const login = async( email: string, password: string ): Promise<boolean> => {

        try {
            //ver como hacer el axios?
            const { data } = await bigNoTokenApi().post('login-user', { email, password });
            const { token, user } = data;
            dispatch({ type: '[Auth] - Login', payload: user });
            localStorage.setItem('token', token);
            return true;
        } catch (error) {
            return false;
        }

    }


    const logout = () => {
        dispatch({ type: '[Auth] - Logout' });
        localStorage.removeItem('token');
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
