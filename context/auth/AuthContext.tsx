import { createContext } from 'react';
import { IUser } from '../../interfaces';

interface ContextProps {
   isLoggedIn: boolean;
   user?: IUser;
   token?: string;
   signup: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>;
   login: (email: string, password: string) => Promise<boolean>;
   logout: () => void;

}

export const AuthContext = createContext({} as ContextProps);