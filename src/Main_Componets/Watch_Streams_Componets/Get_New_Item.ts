
import axios from 'axios'

import { Home_Store } from "../Home_Componets/Home_Store"
import { Setting_store } from '../Settings_Componets/Settings_Store';

import type { Item } from '../Globals/Global_types';
import type { LoaderFunctionArgs } from 'react-router-dom';

import Is_Item_Family_Friendly from './Is_Item_Family_Friendly';
import { globalstore } from '../Globals/Global_Store';

async function Get_New_Item({params}:LoaderFunctionArgs){
  const {id,type}=params
  const CurrentItem=Home_Store.getState().CurrentItem
  const Setting_Options=Setting_store.getState().Setting_Options
  const APIKEY=import.meta.env.VITE_APIKEY

  if(CurrentItem!=='a' && Number(id)===CurrentItem.id){
      ToWatchedItems(CurrentItem)
      return CurrentItem
} //we previously chose this item
  
  /* We choose a new item */
  try{
        const ApiType= type==='Movie' ? 'movie' : 'tv'
        const response=await axios.get(`https://api.themoviedb.org/3/${ApiType}/${id}?api_key=${APIKEY}`)        
        const data:Item=response.data

        /* Check if the item is pg or not if the setting is on */
        if(!Setting_Options.find((v)=>v.SettingName==='Adult Mode')?.isActive){
              const checkpg=await Is_Item_Family_Friendly(data.id,APIKEY,ApiType)
               const name= ApiType==='tv' ? data.name : data.title
              if(!checkpg || data.adult){throw new Response(`${name} is not PG rated`,{status:403})}}
              
        const newdata={...data,type:String(type)}
        ToWatchedItems(newdata)
        return newdata         
   }
      catch(error){
       if(error instanceof Response){throw error}
       if(axios.isAxiosError(error)){throw new Response(error.message,{status:404})}
       else{throw new Response(`Network Error`,{status:500})}} 
 } 
  
export default Get_New_Item


/* Add item to watched list if exceeds 50 then delete the oldest one */
 function ToWatchedItems(Item:Item){
     const Watched=globalstore.getState().WatchedItems.find((v)=>Item.id===v.id)
     if(Watched){return}
     else if(!Watched){globalstore.getState().AddWatchedItem(Item)}
     if(globalstore.getState().WatchedItems.length===50){globalstore.getState().RemoveWatchedItem(globalstore.getState().WatchedItems[0].id)}
  }