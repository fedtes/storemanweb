import * as React from "react";
import { createContext } from 'react';
import { APIProvider } from './APIProvider';


export function appPath(path: string) {
    return "/storeman" + path;
};


type Props = {
    children: React.ReactNode
};

export const APIContext = createContext<APIProvider>(null);

export function useAPI() {
    return React.useContext(APIContext);
}

export function API({ children }: Props) {
    const api = new APIProvider();
    return (
        <APIContext.Provider value={api} >
            {children}
        </APIContext.Provider>
    );
}

