import React, { Fragment } from 'react'
import "./PaymentCard.css"
import {MdOutlineKeyboardBackspace} from "react-icons/md"
import {RiRefreshFill} from "react-icons/ri"
import { useCard } from '../../context/CardContext'
import { useDispatch, useSelector } from 'react-redux'
import { resetCard } from '../../card_Redux/card_items_actions'
import emptyCard from "../../assets/emptyCart.svg"
import Item from './Item'

function PaymentCard() {

    const state=useSelector((state)=>state.card_items_Reducer)

    const {showCard,setShowCard}=useCard();
    
    const handleBackClick = () => {
        setShowCard(!showCard)
    };
    
    const dispatch=useDispatch()

  return (
    <Fragment>
    { showCard &&
        <div className='payment-card' >
            <div className='heading'>
                <MdOutlineKeyboardBackspace onClick={handleBackClick}/>
                <div>Cart</div>
                <div onClick={()=>{dispatch(resetCard())}}>
                    <span>Clear</span>
                    <RiRefreshFill/>
                </div>
            </div>    
            {state.length>0?
            
                <Fragment>

                    <div className='card-body'>
                    
                        <div className='items-container'>

                            {state.map((item)=>
                                <div className='item' key={item.id}>
                                    <Item item={item}/>
                                </div>
                            )}

                        </div>

                        <div className='checkOut-container'>
                            <div >
                                <div>Sub Total</div>
                                <div>
                                    { state.reduce((acc, curr) =>
                                         acc + Number(curr.price*curr.qty), 0)
                                    }
                                </div>
                            </div>

                            <div className='delive'>
                                <div>Delivery</div>
                                <div>$ 2.5</div>
                            </div>

                            <div className='total'>
                                <div>Total</div>
                                <div>$ {2.5 + state.reduce((acc, curr) =>
                                    acc + Number(curr.price*curr.qty), 0)}
                                </div>
                            </div>

                            <button>Check Out</button>
                            
                        </div>

                    </div>
                
                </Fragment>:
                <div className='empty-card'>
                    <div className='img-cont'>
                        <img alt='' src={emptyCard}/>
                    </div>
                    <div>Add some items to your cart</div>
                </div>
                    
            }


    </div>
    
    }
    </Fragment>
  )
}

export default PaymentCard