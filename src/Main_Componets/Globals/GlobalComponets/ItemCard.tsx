
import type { Item } from "../Global_types"

import { Setting_store } from "../../Settings_Componets/Settings_Store"
import { globalstore } from "../Global_Store";

import Like from "./Like"

import {FaStar} from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

function ItemCard({ItemInfo}:{ItemInfo:Item}) {

  const {Setting_Options}=Setting_store()
  const {WatchedItems}=globalstore()

  const ItemName= ItemInfo.type==='TvShow' ? ItemInfo.name : ItemInfo.title 
  const StartDate=ItemInfo.type==='TvShow' ? ItemInfo.first_air_date : ItemInfo.release_date

  const setcondition=WatchedItems.find((v)=>v.id===ItemInfo.id) && Setting_Options.find((v)=>v.SettingName==='Show Indicators')?.isActive

  const nav=useNavigate()

  return (
    <div 
      onClick={()=>nav(`/Watch/${ItemInfo.type}/${String(ItemInfo.id)}`)}
      className="relative border-4 Border_Color Border_Hover mb-25 rounded-xl cursor-pointer">
      <Like Item={ItemInfo} position={'top-2'}/>
      {setcondition &&(<IoCheckmarkDoneOutline className=" absolute left-2 top-2 text-[#10b981] dark:text-[#059669] text-3xl xl:text-[38px]"/>)}
      <img className="h-full w-full rounded-xl" src={`https://image.tmdb.org/t/p/w780/${ItemInfo.poster_path}`} alt="Movie Image" />

      <section className="my-2.5 text-base md:text-lg lg:text-xl  font-bold pl-0.5 select-none ">
        <h1 className="line-clamp-2">{ItemName}</h1>
         <section className="flex justify-between w-[50%] Secondary_Text_Color my-1">
         <p className="flex items-center mr-2"><FaStar className='text-yellow-400 mb-px mr-1'/>{ItemInfo.vote_average.toFixed(2)}</p>
         <p >{StartDate?.slice(0,4)}</p>
         </section>
      </section>
    </div>
  )
}

export default ItemCard