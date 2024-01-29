import React, { useState } from 'react'
import { useRef } from 'react';
import {MdChevronLeft,MdChevronRight,MdShoppingBasket} from "react-icons/md"
import {BiDotsVerticalRounded} from "react-icons/bi"
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFoods } from '../../foodItems_Redux/foodItems_actions';
import "./Menu.css"
import {IoFastFood} from "react-icons/io5"
import {categories} from "../../Data/create_items_categories"
import useWindow from "../../hooks/useWindow"
import NotFound from "../../assets/NotFound.svg"
import { addItem,setItems } from '../../card_Redux/card_items_actions';

function Menu() {

    const containerRef = useRef(null);

    const handleScrollLeft = (scrollOffset) => {
      containerRef.current.scrollLeft -= scrollOffset;
    };
  
    const handleScrollRight = (scrollOffset) => {
      containerRef.current.scrollLeft += scrollOffset;
    };

    const dispatch=useDispatch()

    const card_items_state=useSelector((state)=>state.card_items_Reducer)

    useEffect(() => {  
      dispatch(fetchFoods())
    }, [])
  
    const foods =useSelector((state)=>state.foodItemsReducer)
    const [filter,setFilter] =useState("chicken")
    const screenSize=useWindow();

    const add=(item)=>{
      dispatch(addItem(item))
   }

    useEffect(() => {
      const storedItems = JSON.parse(localStorage.getItem("card_items"));
      if (storedItems && storedItems.length > 0) {
        dispatch(setItems(storedItems));
      }
    },[]);

    useEffect(() => {
      localStorage.setItem("card_items", JSON.stringify(card_items_state));
    }, [card_items_state]);
  

    return (
        <div className='menu-section section'>
          <div className='container'>
    
              <div className='heading-container menu-heading'>
                  <h2>Our Hot Dishes</h2>
                  {screenSize[0]<992&&
                    <div className='buttons'>
                      <MdChevronLeft onClick={()=>{handleScrollLeft(50)}}/>
                      <MdChevronRight onClick={()=>{handleScrollRight(50)}}/>
                    </div>     
                  }

              </div>


          <div className='HorizontalScroll-container catg-container' ref={containerRef}>

            {categories.map((category)=>
                
              <div className={`dishes-card ${category.urlParamName===filter?"selected-card":""} `}   key={category.id} onClick={()=>{setFilter(category.urlParamName)}} >
                <div className='fastFood-icon-container'>
                  <IoFastFood/>
                </div>
                <div className='catg' >
                  {category.name}
                </div>
              </div>
            )}

          </div>

            <div className='MenuContainer' >

              {foods?.filter((items)=>items.category===filter).length>0?
                <>
                {foods?.filter((items)=>items.category===filter).map((item)=>
                  <div className='section-card' key={item.id}>
      
                    <div className='img-side'>
                      <img alt="" src={item.imgURL}/>
                      <div onClick={()=>{add(item)}}>
                        <MdShoppingBasket/>
                      </div>
                      {/* <BiDotsVerticalRounded className='params'/> */}
                    </div>
        
                    <div className='descrp-side'>
                      <div>{item.title}</div>
                      <div>{item.calories} callories</div>
                      <div><span>$</span>{item.price}</div>
                    </div>

                  </div>
                )
              }
              
              </>:
                <div  className="NotFound">
                  <img alt="" src={NotFound} className="img-NotFound"/>
                  <div>Items Not Available</div>
                </div>
              }

            </div> 
          


    
          </div>
        </div>
      )
}

export default Menu