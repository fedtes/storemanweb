import * as React from "react";
import { createContext } from 'react';
import { APIProvider } from './APIProvider';
export function appPath(path) {
    return "/storeman" + path;
}
;
export const APIContext = createContext(null);
export function useAPI() {
    return React.useContext(APIContext);
}
export function API({ children }) {
    const api = new APIProvider();
    return (React.createElement(APIContext.Provider, { value: api }, children));
}
//# sourceMappingURL=index.js.map