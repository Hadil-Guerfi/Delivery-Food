
export const addItem_to_card="ADD_ITEM_TO_Card"
export const removeItem_from_card="REMOVE_ITEM_FROM_Card"
export const set_items="SET_ITEMS"
export const reset_card="RESET_CARD"
export const update_item="UPDATE_Item"

export const addItem=(item)=>{
    return{
        type:addItem_to_card,
        payload:item
    }
}


export const removeItem=(item)=>{
    return{
        type:removeItem_from_card,
        payload:item
    }
}

export const setItems=(items)=>{
    return{
        type:set_items,
        payload:items
    }
}

export const updateItem=(id,newQty)=>{
    return{
        type:update_item,
        payload:{id,newQty}
    }
}


export const resetCard=()=>{
    return{
        type:reset_card,
        payload:[]
    }
}