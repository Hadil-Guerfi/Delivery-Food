import {createStore ,combineReducers,applyMiddleware } from "redux"
import { foodItemsReducer } from "./foodItems_reducer"
import thunk from 'redux-thunk';
import { card_items_Reducer } from "../card_Redux/card_items reducer";

const rootReducer = combineReducers({
  //fetched from database
  foodItemsReducer,
  //manipulated in card of items
  card_items_Reducer
});

export const store=createStore(rootReducer,applyMiddleware(thunk))