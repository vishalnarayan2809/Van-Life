import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api";
  export const AuthContextInternal = createContext()


export default function AuthContext({children}){

    const [user,setUser] = useState(null)
    const[loading,setLoading] = useState(true)
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, user =>{
            if(user){
                setUser(user);
                console.log(user)
                
            }else{
                setUser(null)
            }
            setLoading(false)
        })
        return unsubscribe
    },[])

  
    return <AuthContextInternal.Provider value={{user,loading}}>
            {children}
            </AuthContextInternal.Provider>
     

}