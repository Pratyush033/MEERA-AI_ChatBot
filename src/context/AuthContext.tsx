import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { loginUser, checkAuthStatus } from "../helpers/api-communicator";

//here we are using typescript so will mention type
type User = {
    name: string;
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;

    //functions for login logout and promise for void will not return anything 
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    //logout once we move logout we need to remove cookies 
    logout:()=>Promise<void>;

};

const AuthContext = createContext<UserAuth | null>(null);


export const AuthProvider = ({children} : { children: ReactNode }) => {
    
    const [user, setUser] = useState<User | null>(null);

   
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    
    useEffect(() => {
        
        async function checkStatus() {
            const data = await checkAuthStatus();

            if(data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            } 
        }
        checkStatus();
    }, []);


    const login = async( email: string, password: string) => {
        const data = await loginUser(email, password);
        if(data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };
    const signup = async ( name: string, email: string, password: string) => {};
    const logout = async () => {};

    
    

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    };
        return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>


};

   //create context that can be used by children 
   export const useAuth = () => useContext(AuthContext);