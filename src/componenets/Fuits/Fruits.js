import React, { useState } from 'react'
import "./Fuits.css"
import {MdChevronLeft,MdChevronRight,MdShoppingBasket} from "react-icons/md"
import { useRef } from 'react'
import "../horizontalScroll/HorizontalScroll.css"
import { useDispatch,useSelector } from 'react-redux'
import { fetchFoods } from '../../foodItems_Redux/foodItems_actions'
import { useEffect } from 'react'
import { adminEmail, useAuth } from '../../context/AuthContext'
import { addItem } from '../../card_Redux/card_items_actions'

function Fruits() {
 
  const containerRef = useRef(null);

  const handleScrollLeft = (scrollOffset) => {
    containerRef.current.scrollLeft -= scrollOffset;
  };

  const handleScrollRight = (scrollOffset) => {
    containerRef.current.scrollLeft += scrollOffset;
  };

  const dispatch=useDispatch();

  useEffect(() => {  
    dispatch(fetchFoods())
  }, [])

  const foods =useSelector((state)=>state.foodItemsReducer)
  const fruits=foods?.filter(item=>item.category==="fruits")
  const {currentUser}=useAuth();
  const [isAdmin,setIsAdmin]=useState(false)
 
  useEffect(() => {
    if(currentUser?.email===adminEmail){
      setIsAdmin(true)
    }
    else{
      setIsAdmin(false)
    }  
  }, [currentUser,isAdmin])

 const add=(item)=>{
    dispatch(addItem(item))
 }


  return (
    <div className='fruits-section section'>
      <div className='container'>

        <div className='heading-container'>
          <h2>Our Fresh & Healthy Fruits</h2>
          {fruits.length>3}{
            <div className='buttons'>
              <MdChevronLeft onClick={()=>{handleScrollLeft(50)}}/>
              <MdChevronRight onClick={()=>{handleScrollRight(50)}}/>
            </div>
          }

        </div>


        
        <div className='HorizontalScroll-container' ref={containerRef}>
          {fruits?.map((item)=>{
            return(

              <div className='section-card' key={item.id}>

              <div className='img-side' >
                <img alt="" src={item.imgURL}  />
                <div onClick={()=>{add(item)}}>
                  <MdShoppingBasket />
                </div>
              </div>
  
              <div className='descrp-side'>
                <div>{item.title}</div>
                <div>{item.calories} callories</div>
                <div><span>$</span>{item.price}</div>
  
              </div>
            </div>

            )
          })}
        </div>



      </div>
    </div>
  )

}

export default Fruits