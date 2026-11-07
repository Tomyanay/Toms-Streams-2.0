
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
      className="relative border-4 Border_Color Border_Hover mb-20 cursor-pointer
       h-58.25 sm:h-65 md:h-75 2xl:h-90 3xl:h-110 4xl:h-140 rounded-xl -mx-4">
      <Like Item={ItemInfo} position={'top-2'}/>
      {setcondition &&(<IoCheckmarkDoneOutline className=" absolute left-2 top-2 text-[#10b981] dark:text-[#059669] text-3xl xl:text-[38px]"/>)}
      <img draggable={false} className="h-full w-full rounded-lg select-none" src={`https://image.tmdb.org/t/p/w780/${ItemInfo.poster_path}`} alt="Movie Image" />

      <section className="my-2.5 text-[15px] sm:text-base 2xl:text-lg font-bold pl-0.5 select-none ">
        <h1 className="line-clamp-1">{ItemName}</h1>
         <section className="flex Secondary_Text_Color my-1">
         <p className="flex items-center mr-2"><FaStar className='text-yellow-400 mb-px mr-1'/>{ItemInfo.vote_average.toFixed(2)}</p>
         <p className="ml-2.5">{StartDate?.slice(0,4)}</p>
         </section>
      </section>
    </div>
  )
}

export default ItemCard