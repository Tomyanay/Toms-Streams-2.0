
import type { Episodes } from '../Watch_Stream_types';

import { WatchShop } from '../Watch_Stream_Store';
import { Setting_store } from '../../Settings_Componets/Settings_Store';

import {FaStar,FaRegClock } from "react-icons/fa";

import clsx from 'clsx'

function EpisodeFrame({EpisodeInfo}:{EpisodeInfo:Episodes}) {
     
    const {setstat,stats}=WatchShop()
    const {Setting_Options}=Setting_store()

    const Hour=Math.floor(Number(EpisodeInfo.runtime)/60)

    /* Highlight border color of current watched episode */
    const Borderclass=clsx(
    "Border_Color Border_Hover",
     EpisodeInfo.episode_number===stats.episode && 'border-movie-red dark:border-light-movie-red')

  return (
    <a
      onClick={()=>setstat('episode',EpisodeInfo.episode_number)}
      draggable={false} 
      className={`border-3 Outer_Section_Background ${Borderclass} 
      ${!Setting_Options.find((v)=>v.SettingName==='Episode View Style')?.isActive ? 'mx-5 xl:mx-10 3xl:mx-40' : 'mx-2.5'}
       rounded-md my-5`} 
      href="#Show">
    
       <div className={`${!Setting_Options.find((v)=>v.SettingName==='Episode View Style')?.isActive 
        ? 'md:flex ' 
        : 'h-full flex flex-col'}`}>

        <section className={`${Setting_Options.find((v)=>v.SettingName==='Spoiler free mode')?.isActive && 'blur-lg'}`}>
            <img 
            draggable={false}
            className={`select-none ${Setting_Options.find((v)=>v.SettingName==='Episode View Style')?.isActive 
            ? 'w-full  '
            : 'md:h-full w-full lg:w-auto md:rounded-l-sm'} rounded-t-sm `}
            src={`https://image.tmdb.org/t/p/w300/${EpisodeInfo.still_path}`} 
            alt={`Episode ${EpisodeInfo.episode_number} Image`} />
        </section>
        
         <section className={`text-lg  
            ${!Setting_Options.find((v)=>v.SettingName==='Episode View Style')?.isActive
              ? 'w-full ml-1.5 md:ml-4 ' 
              : 'ml-2 '}`}>
            <h1 title={EpisodeInfo.name}
              className="font-bold my-5 text-xl">Ep {EpisodeInfo.episode_number}
              <span className="mt-0.5 block truncate Red_Text_Color ">{EpisodeInfo.name}</span>
            </h1>

          <div className={`flex justify-between items-center font-semibold  ${!Setting_Options.find((v)=>v.SettingName==='Episode View Style')?.isActive && 'lg:w-[40%]'} my-5`}>
            <p className="flex items-center "><FaRegClock className="mr-1 mb-px "/>{Hour>0 &&(<span className="mr-1 sm:mr-1.5">{Hour}hr</span>)} {Math.floor(Number(EpisodeInfo.runtime)%60)}m</p>
            <p>{EpisodeInfo.air_date.slice(0,4)}</p>
            <p className="flex items-center mr-3"><FaStar className='text-yellow-400 mb-px mx-1'/>{Number(EpisodeInfo.vote_average).toFixed(2)}</p>
          </div>
          {!Setting_Options.find((v)=>v.SettingName==='Spoiler free mode')?.isActive &&(
            <p 
             className="Secondary_Text_Color my-5 mr-2">
             {EpisodeInfo.overview}
            </p>)}
        </section> 
       </div> 
   </a>)}

export default EpisodeFrame