import { addItem_to_card, update_item, } from "./card_items_actions";
import { removeItem_from_card } from "./card_items_actions";
import { set_items } from "./card_items_actions";
import { reset_card } from "./card_items_actions";

export const card_items_Reducer = (state = [], action) => {
  switch(action.type) {
    case addItem_to_card:
      return [...(state.filter((item) => item.id !== action.payload.id)), action.payload];
    case removeItem_from_card: 
      return state.filter((item) => item.id !== action.payload.id);
    case set_items:
      return action.payload;
    case update_item:
      return state.map((item)=>{
        if(item.id===action.payload.id){
          item.qty=action.payload.newQty
        }
        return item;
      })
    case reset_card:
        return []

    default:
      return state;
  }
};
