
import { FaHeart} from "react-icons/fa";

import type { Item } from "../Global_types";

import { globalstore } from "../Global_Store";
import { Setting_store } from "../../Settings_Componets/Settings_Store";

import {useState } from "react";

import WarrningMessage from "./WarrningMessage";


function Like({Item,position}:{Item:Item,position:string}) {

  const {LikedItems,AddlikedItem,RemoveLikedItem}=globalstore()

  const{Setting_Options}=Setting_store()
  const [isliked,setliked]=useState(false)
  const [ShowMessage,setMessage]=useState(false)

  if(LikedItems.find((v)=>v.id===Item.id) && !isliked){setliked(true)} //Checks if an item is liked for turning heart red
  if(!LikedItems.find((v)=>v.id===Item.id) && isliked){setliked(false)} //Checks if an item was removed from the liked items using the Warrning message

  function setlikedState(e:React.MouseEvent<SVGElement, MouseEvent>){
     e.stopPropagation()
     if(!LikedItems.find((v)=>v.id===Item.id)){
      setliked(true)
      AddlikedItem(Item)
    }

    else{
      if(!Setting_Options.find((v)=>v.SettingName ==='Confirm Message')?.isActive){
        setliked(false)
        RemoveLikedItem(Item.id)
      }
      else{setMessage(true)}    
    }
  }

  return (
    <>
      <FaHeart onClick={(e)=>setlikedState(e)}
       className={`absolute right-2 ${position} cursor-pointer text-3xl xl:text-4xl ${isliked ? 'Red_Text_Color' : ''} transition-all ease-in-out duration-500 hover:scale-125`}/>
       {ShowMessage &&(<WarrningMessage ID={Item.id} setMessage={setMessage}/>)}
    </>
  )
}

export default Like