import { createContext } from 'react';

interface ContextProps {
   user: null,
   error: null,
   login: (email: string, password: string) => Promise<void>,
   signout: () => void,

}

export const AuthContext = createContext({} as ContextProps);