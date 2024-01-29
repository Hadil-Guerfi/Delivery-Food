
import {getAllFoods} from "../Data/fire_functions"
import { firestore } from "../firebase.config"
import{collection, doc,getDocs,setDoc} from "firebase/firestore"

export const Get_All_Foods="get all foods"

export const getFoods=(foods)=>{
  return{
    type:Get_All_Foods,
    payload:foods
  }
}

export const fetchFoods = () => {

  return async (dispatch)=>{    
    
      await getAllFoods().then((data)=>{

        dispatch(getFoods(data))
      })

    }

}

