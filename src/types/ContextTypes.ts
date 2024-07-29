import {ReactNode} from 'react';

export interface ContextProviderProps {
  children: ReactNode;
}

export interface AppContextType {
  token: string | null;
  tokenHandler: (token: string) => void;
}
