import { createContext, useContext ,useState} from "react";


const cardContext=createContext();

export function useCard(){
    return useContext(cardContext)
}

export function CardProvider({children}){

    
    const [showCard,setShowCard]=useState(false)

    const value={
        showCard,
        setShowCard,
    }

    return (
    
        <cardContext.Provider value={value}>

            {children}
    
        </cardContext.Provider>
    

  )

}