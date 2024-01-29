
import{collection, doc,getDocs,setDoc} from "firebase/firestore"
import { firestore } from "../firebase.config"

export const saveItem=async(data)=>{
    await setDoc(doc(firestore,"foodItems",`${Date.now()}`),data,{merge:true})
}

const foodsCollectionsRef=collection(firestore,"foodItems")

export const getAllFoods=async()=>{
    const items=await getDocs(foodsCollectionsRef);
    return items.docs.map((doc)=>doc.data());
}