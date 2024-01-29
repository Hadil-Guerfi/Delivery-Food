import React, { Fragment, useState } from 'react'
import {BiPlus,BiMinus} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, updateItem } from '../../card_Redux/card_items_actions'
import { useEffect } from 'react'

function Item({item}) {

    const dispatch=useDispatch()

    const card_items_state=useSelector((state)=>state.card_items_Reducer)

    const deleteItem=(item)=>{
      dispatch(removeItem(item))
    }

    const [qtt,setQtt]=useState(item?.qty)

    const handleDecrement=(id)=>{
        if(qtt>0){
            setQtt(qtt-1)
            console.log(id,qtt)
        }
    }

    const handleIncrement=(id)=>{
          setQtt(qtt+1)
  }

  useEffect(() => {
    dispatch(updateItem(item.id,qtt))
    console.log(card_items_state)
  }, [qtt])


  return (
    <Fragment>
        <img alt="img" src={item.imgURL}/>
        <AiFillDelete className='delete-item' onClick={()=>{deleteItem(item)}}/>
        <div className='title-price'>
            <div>{item.title}</div>
            <div>$ {item.price *qtt } </div>
        </div>
        <div>
            <BiMinus onClick={()=>{handleDecrement(item?.id)}}/>
            <span>{item.qty}</span>
            <BiPlus onClick={()=>{handleIncrement(item?.id)}}/>
        </div>

    </Fragment>
  )
}

export default Item