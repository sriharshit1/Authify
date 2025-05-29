import { createContext, useEffect, useState } from "react";
import { AppConstants } from "../util/constants";
import { toast } from "react-toastify";
import axios from "axios"

export const AppContext = createContext();

export const AppContextProvider =(props)=>{

    axios.defaults.withCredentials = true;

    const backendURL = AppConstants.BACKEND_URL;
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [userData,setUserData] = useState(null);

    const getUserData = async()=>{
        try{
            const response = await axios.get(backendURL+"/profile");
            if(response.status === 200){
                setUserData(response.data);
            }else{
                toast.error("Unable to retrieve profile");
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }


    const contextValue ={
            backendURL,
            isLoggedIn,setIsLoggedIn,
            userData,setUserData,
            getUserData,
    }

    const getAuthState = async()=>{
        try{
            const response = await axios.get(backendURL+"/is-authenticated");
            if(response.status === 200 && response.data === true){
                setIsLoggedIn(true);
                await getUserData();
            }else{
                setIsLoggedIn(false);
            }
        }
        catch(error){
           if (error.response?.status !== 401) {
            console.error("Auth check error:", error);
        }
        setIsLoggedIn(false); // Mark user as logged out 
        }
    };

    useEffect(()=>{
        getAuthState();
    },[]);

    return(
        <>
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
        </>
    )
}

