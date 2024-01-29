import {Get_All_Foods} from "./foodItems_actions"

export const foodItemsReducer=(state= [], action  )=>{
    switch(action.type){
      case  Get_All_Foods:
        return [...action.payload];
      default:
        return state
    }
  
  }