import React, { Fragment, useState } from 'react'
import "./CreateItem.css"

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import {storage} from "../../firebase.config"
import {MdFastfood,MdCloudUpload,MdFoodBank,MdAttachMoney,MdDelete} from "react-icons/md"
import {categories} from "../../Data/create_items_categories"
import Loader from "../Loader/Loader"
import { saveItem } from '../../Data/fire_functions';
import { useDispatch } from 'react-redux';
import { fetchFoods } from '../../foodItems_Redux/foodItems_actions';


export default function CreateItem() {

  const [title,setTitle]=useState('')
  const [calories,setCalories]=useState('')
  const [price,setPrice]=useState(0)
  const [category,setCategory]=useState('')
  const[alertStatus,setAlertStatus]=useState("")
  const [msg,setMsg]=useState("")
  const [isLoading,setIsLoading]=useState(false)
  const [imageAsset,setImageAsset]=useState(null)
  //process indicatore for begining and end of alerte
  const [process,setProcess]=useState(false)
  const [saveBtnStatus,setSaveBtnStatus]=useState(false)
  const dispatch=useDispatch()

  const uploadImage = (e) => {

      setIsLoading(true);
  
      const imageFile = e.target.files[0];
  
      const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
  
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const uploadProgress =
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        },
        (error) => {
          console.log(error);
          setProcess(true)
          setMsg("Error while uploading : Try Again ! ");
          setAlertStatus("failture")
          setTimeout(() => {
            setIsLoading(false);
            setProcess(false)
          }, 4000);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageAsset(downloadURL);
                setProcess(true)
                setIsLoading(false);
                setMsg("Image uploaded successfully");
                setAlertStatus("success")
                setTimeout(() => {
                  setProcess(false)
                }, 4000);
          });
        }
      );
    };

    const deleteImage=()=>{
      setIsLoading(true);
      const deleteRef=ref(storage,imageAsset);
      deleteObject(deleteRef).then(()=>{
        setImageAsset(null);
        setIsLoading(false);
        setProcess(true);
        setMsg("Image deleted successfully")
        setAlertStatus("success")
        setTimeout(() => {
          setProcess(false)
        }, 4000);
      })
    }

    const saveDetails=()=>{
      setIsLoading(true);

      try{
        if(!title||!calories||!imageAsset||!price||!category){
          setProcess(true)
          setMsg("Required fields can't be empty ");
          setAlertStatus("failture")
          setTimeout(() => {
            setIsLoading(false);
            setProcess(false)
          }, 4000);
        }else{
          const data={
            id:`${Date.now()}`,
            title:title,
            imgURL:imageAsset,
            category:category,
            calories:calories,
            qty:1,
            price:price
          }
          setSaveBtnStatus(true)     
          saveItem(data);
          setProcess(true)
          setIsLoading(false);
          setMsg("Data uploaded successfully");
          setAlertStatus("success")
          setTimeout(() => {
            setProcess(false)
            setSaveBtnStatus(false)      
            clearData()
          }, 4000);
        }
      }
      catch(error){
        console.log(error);
        setProcess(true)
        setMsg("Error while saving : Try Again ! ");
        setAlertStatus("failture")
        setTimeout(() => {
          setIsLoading(false);
          setProcess(false)
        }, 4000);
      }

      //update items each time admin add a new article
      dispatch(fetchFoods())

    }

    const clearData=()=>{
      setTitle("");
      setImageAsset(null);
      setCalories("");
      setPrice(0);
      setCategory("Select Category")
    }

    console.log(category)


  
      return(
        
        <div className='create-item'>
          <div className='container'>
            <div className='createItem-container'>

              {process&&
                <Fragment>
                
                {
                  ( alertStatus==="success")?
                   <div  className='success process-status'> {msg}</div>
                   :
                   <div className='failture process-status'>{msg}</div>
                 }
                
                
                </Fragment>
              }
              
              <div className='input-title'>
                <MdFastfood/>
                <input 
                type="text" 
                placeholder='Give me a title...'
                className='title'
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                />
              </div>

              <select className='categories' value={category}  onChange={(e)=>{setCategory(e.target.value)}}>
                  <option value="Select Category" >Select Category</option>

                {categories.map((category)=>

                  <option key={category.id} value={category.urlParamName}>{category.name}</option>

                )}
                
              </select>
                  
                  {imageAsset?
                  <div className='imported-img-cont'>
                    <div className='delete-img-container'>
                      <img  src={imageAsset}/>
                      <button onClick={deleteImage}  className='delete-btn'>
                        <MdDelete/>    
                      </button>
                    </div>
                  </div>
                  :
                  <Fragment>
                  {isLoading ?

                    <div className="loader">
                      <Loader />
                    </div>
                    :
                    <label >
                    <div>
                      <MdCloudUpload/>
                      <div>Click here to upload</div>
                    </div> 

                    <input
                      className='upload'
                      type="file"
                      name="uploding img"
                      accept="image/*"
                      onChange={uploadImage}
                    />

                  </label>
                  }
                  </Fragment>
                  
                }


              <div className='description'>

                <div className='calories'>
                  <MdFoodBank/>
                  <input 
                  type="text"
                  placeholder='Calories' 
                  required
                  value={calories}
                  onChange={(e)=>{setCalories(e.target.value)}}
                  />
                </div>

                <div className='price'>
                  <MdAttachMoney/>
                  <input 
                  type="text"
                  placeholder='Price' 
                  value={price}
                  onChange={(e)=>{setPrice(e.target.value)}}
                  required/>
                </div>   

              </div>
              <div className='save-container'>
                <button disabled={saveBtnStatus} onClick={saveDetails} >Save</button>
              </div>
            </div>
          </div>
        </div>
      )

}