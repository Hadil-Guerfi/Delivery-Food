import React from 'react'
import "./Home.css"
import delivrey from "../../assets/delivery.png"
import heroBg from "../../assets/heroBg.png"
import { home_static_sata } from '../../Data/home_static_data'
import Fruits from '../Fuits/Fruits'
import Menu from '../Menu/Menu'
import Contact from '../Contact/Contact'

function Home() {

  return (
    <>
    <div className='home'>

        <div className='container'>

            <div className='left-side'>
              <div className='bike'>
                <span>Bike Delivery</span>
                <img alt="delivery" src={delivrey}/>
              </div>
              <div  className='title'>
                <span>The Fatest Delivery in</span>
                <span>Your City</span>
              </div>
              <div className='text'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</div>
              <button>Order Now</button>
            </div>
    
            <div className='right-side'>
              <img className='herobg' alt="heroBg" src={heroBg} />
              <div className='static_home_cards'>
                {home_static_sata.map((card,index)=>
                  <div key={index} className='static_home_card'>
                    <img alt='card' src={card.image}/>
                    <div>{card.imageTitle}</div>
                    <div>{card.description}</div>
                    <div><span>$</span>{card.price}</div>
                  </div>
                )}
              
              </div>
            
            </div>    
        
        </div>
    
    </div>


    <Fruits/>
    <Menu/>
    <Contact/>

    </>

  )
}

export default Home