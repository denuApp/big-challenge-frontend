import { createContext } from 'react';
import { IUser } from '../../interfaces';

interface ContextProps {
   isLoggedIn: boolean;
   user?: IUser;
   token?: string;
   getUser: () => Promise<{user: IUser}>;
   signup: (name: string, email: string, password: string, role: string) => Promise<{ hasError: boolean; message?: string; }>;
   login: (email: string, password: string) => Promise<{hasError: boolean; message?: string; user?: IUser}>;
   logout: () => void;

}

export const AuthContext = createContext({} as ContextProps);