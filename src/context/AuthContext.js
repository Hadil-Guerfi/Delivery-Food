import React, { createContext, useContext, useEffect, useState } from 'react'

import {auth} from "../firebase.config" 

import { GoogleAuthProvider,signInWithPopup } from "firebase/auth"



const AuthContext=createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export const adminEmail="hdlguerfi@gmail.com"



export function AuthProvider({children}) {

    const[currentUser,setCurrentUser]=useState(null)
    const[loading,setLoading]=useState(false)

      //Google Auth:
      const provider=new GoogleAuthProvider();
      function signInWithGoogle(){
        return signInWithPopup(auth,provider)
      }

    
      function logout(){
        return auth.signOut()
      }



    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged((user)=>{
            setCurrentUser(user);
            setLoading(true)
        })

        return unsubscribe

    },[])


    const value={
        currentUser,
        signInWithGoogle,
        logout,
    }

  return (
    
        <AuthContext.Provider value={value}>

            {loading && children}
    
        </AuthContext.Provider>
    

  )
}


