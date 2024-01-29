import "./Header.css"
import React, { Fragment } from 'react'
import logo from "../../assets/logo.png"
import {MdShoppingBasket} from "react-icons/md"
import avatar from "../../assets/avatar.png"
import useWindow from "../../hooks/useWindow"
import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { auth } from "../../firebase.config"
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth"
import { async } from "@firebase/util"
import { adminEmail } from "../../context/AuthContext"
import {IoMdAdd} from "react-icons/io"
import {MdLogout} from "react-icons/md"
import { useEffect } from "react"
import { useCard } from "../../context/CardContext"
import { useSelector } from "react-redux"

const Header = () => {

  let windowSize=useWindow();
  let  [open,setOpen]=useState(false)
  const [scale, setScale] = useState(1);
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const {currentUser,signInWithGoogle,logout}=useAuth();
  const [isAdmin,setIsAdmin]=useState(false)
  const navigate=useNavigate()

  const {showCard,setShowCard}=useCard();

 
  const handleIconClick = () => {
    setShowCard(!showCard)
  };

  const card_items =useSelector((state)=>state.card_items_Reducer)

  const items_nbr=card_items.length;

  async function handleLogin(){
    try{
      setError('')
      setLoading(true)
      await signInWithGoogle();
      console.log("log in sucess")

    }
    catch(e){
      console.log(e.message)
      setError("Failed to Log in")

    }
    setLoading(false)
  }

  const handleOpen=()=>{
    setOpen(!open);
    setScale(0.6);
    setTimeout(() => {
      setScale(1);
    }, 200);

    if(currentUser===null){
      handleLogin();
      setOpen(false)
    }    
  }


  async function handleLogout(e){
    setError('')

    try{
        await logout()
        setOpen(false)
        console.log("log out sucessfully")
    }

    catch(e){
      console.log(e.message)
        setError("Failed to log out")
    }
 
  }

  function handleCreateItem(){
    setOpen(false)
  }

  useEffect(() => {
    if(currentUser?.email===adminEmail){
      setIsAdmin(true)
    }
    else{
      setIsAdmin(false)
    }  
  }, [currentUser,isAdmin])
  
  // console.log(currentUser)
  // console.log(`is admin ${isAdmin}`)


  return (
    <div className="header">
      {windowSize[0] > 768 ? (
        <Fragment>
          <div className="container large-screen-header">
            <Link to="/" className="left-side">
              <img alt="logo" src={logo} />
              <span>City</span>
            </Link>
            <nav>
              <ul>
                <li>
                  <Link>Menu</Link>
                </li>
                {/*<li><a>Menu</a></li> */}
                <li>
                  <a>About Us</a>
                </li>
                <li>
                  <a>Service</a>
                </li>
              </ul>
              <div className="right-side">
                <div className="icon" onClick={handleIconClick}>
                  <MdShoppingBasket />

                  {items_nbr > 0 && <div>{items_nbr}</div>}
                </div>
                <div className="avatar-container">
                  <img
                    style={{
                      transform: `scale(${scale})`,
                      transition: "transform 0.2s",
                    }}
                    alt="avatar"
                    className={`avatar`}
                    src={currentUser ? currentUser.photoURL : avatar}
                    onClick={handleOpen}
                  />
                  {open && currentUser && (
                    <div>
                      {isAdmin && (
                        <div onClick={handleCreateItem}>
                          <Link to="createItem">
                            New Item <IoMdAdd />
                          </Link>
                        </div>
                      )}
                      <div onClick={handleLogout}>
                        <Link to="/">
                          Log Out <MdLogout />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </Fragment>
      ) : (
        <div className="container small-screen-header">
          <div className="right-side">
            <div className="icon" onClick={handleIconClick}>
              <MdShoppingBasket />
              {items_nbr > 0 && <div>{items_nbr}</div>}
            </div>
          </div>
          <Link to="/" className="left-side">
            <img alt="logo" src={logo} />
            <span>City</span>
          </Link>
          <div className="avatar-side">
            <img
              style={{
                transform: `scale(${scale})`,
                transition: "transform 0.2s",
              }}
              alt="avatar"
              className="avatar"
              src={currentUser ? currentUser.photoURL : avatar}
              onClick={handleOpen}
            />
            <nav className={`${open ? "displayed" : "hidden"}`}>
              <ul>
                <li>
                  <Link>Menu</Link>
                </li>
                {/*<li><a>Menu</a></li> */}
                <li>
                  <a>Contact</a>
                </li>
                <li>
                  <a>Service</a>
                </li>

                {open && currentUser && (
                  <Fragment>
                    {isAdmin && (
                      <li onClick={handleCreateItem}>
                        <Link to="createItem">
                          New Item <IoMdAdd />
                        </Link>
                      </li>
                    )}
                    <li onClick={handleLogout}>
                      <Link to="/">
                        Log Out <MdLogout />
                      </Link>
                    </li>
                  </Fragment>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header
