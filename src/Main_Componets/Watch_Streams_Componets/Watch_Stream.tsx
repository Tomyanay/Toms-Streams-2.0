
/* https://averotv.top/player.html?type=movie&id=${movie_id}  = Link to watch the movie*/
/* ttps://averotv.top/player.html?type=tv&id=${Show_id}&season=${Season}&episode=${Episode} =Link for watch show */

import axios from 'axios'
import {useQuery} from '@tanstack/react-query'

import { Home_Store } from "../Home_Componets/Home_Store"
import { Setting_store } from '../Settings_Componets/Settings_Store';
import { WatchShop } from './Watch_Stream_Store';
import { globalstore } from '../Globals/Global_Store';

import type { Item } from '../Globals/Global_types';
import type { Trailertype,TvSeason } from './Watch_Stream_types';

import Like from '../Globals/GlobalComponets/Like';
import Loading from '../Globals/GlobalComponets/Loading';
import Watch_Frame from './Side_Componets/Watch_Frame';
import EpisodeFrame from './Side_Componets/Episode_Frame';

import {FaStar,FaRegClock } from "react-icons/fa";
import {useLoaderData } from "react-router-dom";
import { useEffect, useState } from 'react';

/* tailwind values */

const title_value='font-bold my-2 text-xl xl:text-2xl Title_color'

function Watch_Stream() {
  
  /* Stores */
  const {CurrentItem,setCurrentItem}=Home_Store()
  const {Setting_Options}=Setting_store()
  const {resetstat,stats,setstat}=WatchShop()
  const {WatchedItems,AddWatchedItem,RemoveWatchedItem}=globalstore()
  
  /* The Current Data of our item we want to watch */
  const LoadedData:Item=useLoaderData()

  /* URLS */
  const [TrailerUrl,SetUrl]=useState('')
  const [WatchItemUrl,setItemUrl]=useState('')

  /* Item Info */
  const [extradata,setextradata]=useState<Trailertype>()
  const [Episodes,setEpisodes]=useState<TvSeason>({episodes:[]})
  const [SeasonAmount,setAmount]=useState<{season_number:number}[]>([])

  const APIKEY=import.meta.env.VITE_APIKEY

  /* Set the watched item and limit it to only 50 */
  function Watch(){
     const Watched=WatchedItems.find((v)=>LoadedData.id===v.id)
     if(Watched){return}
     else if(!Watched){AddWatchedItem(LoadedData)}
     if(WatchedItems.length===50){RemoveWatchedItem(WatchedItems[0].id)}
  }

  async function GetTrailer(){
      if(CurrentItem==='a'){return ''} /* If the user enters for the first time */
      else if(CurrentItem.id!==LoadedData.id){return ''} /* Preventing Old item properties from being shown */
      else{
      const ApiType=CurrentItem.type==='Movie' ? 'movie' : 'tv'
      const Extra_Response=await axios(`https://api.themoviedb.org/3/${ApiType}/${CurrentItem.id}?api_key=${APIKEY}&append_to_response=videos`)
      const Data:Trailertype=Extra_Response.data
      setextradata(Data)
     
      const trailers=Data.videos.results.filter((value)=>value.site==='YouTube' && value.type==='Trailer')
      if(trailers.length===0){SetUrl('')}
      else{SetUrl(`https://www.youtube.com/embed/${trailers[0].key}`)}

      if(CurrentItem.type==='Movie'){setItemUrl(`https://averotv.top/player.html?type=movie&id=${CurrentItem.id}`)}  
        
      else{
        setAmount(Data.seasons.filter((v)=>v.episode_count!==0 && v.season_number>0))
        const Show_Response=await axios.get(`https://api.themoviedb.org/3/tv/${CurrentItem.id}/season/${stats.season}?api_key=${APIKEY}`)
        const EpisodeData:TvSeason=Show_Response.data
        if(EpisodeData.episodes.length===0){setItemUrl('');setEpisodes({episodes:[]})}
        else{
          setItemUrl(`https://averotv.top/player.html?type=tv&id=${CurrentItem.id}&season=${stats.season}&episode=${stats.episode}`)
          const FilteredEpisodeData:TvSeason={...EpisodeData,episodes:EpisodeData.episodes.filter((v)=>v.still_path && v.overview!=='')} //Prevent non existing episodes from showing up
          setEpisodes(FilteredEpisodeData)}
        }
        return ''
      }}

  /* Setting the new item as our current item and reseting the seasons and episodes if it is a new item */
  useEffect(()=>{
    setCurrentItem(LoadedData)  
    if(CurrentItem!=='a' && LoadedData.type==='TvShow'){if(LoadedData.id!==CurrentItem.id){resetstat()}}
  },[LoadedData,setCurrentItem,CurrentItem,resetstat]) 

  const {isFetched,isError,error}=useQuery({queryKey:['Item',stats,CurrentItem],queryFn:GetTrailer})

  if(CurrentItem!=='a' && typeof(extradata)!=='undefined'){
    
    const ItemName= CurrentItem.type==='TvShow' ? CurrentItem.name : CurrentItem.title 
    const StartDate=CurrentItem.type==='TvShow' ? CurrentItem.first_air_date : CurrentItem.release_date
    const Hour=CurrentItem.type==='Movie' ? Math.floor(Number(extradata.runtime)/60): 0
  
   return (
    <div onMouseOver={()=>Watch()} className="Inner_Section_Background relative py-5">
      <Like Item={CurrentItem} position='top-6.5'/>
      <h1 title={ItemName} className='Title_color ml-2 text-3xl xl:text-4xl select-none font-bold line-clamp-1 '>{ItemName}</h1>

      {/* Item trailer */}

      {(isFetched && !isError && TrailerUrl!=='') &&(
        <div className='my-5 mx-5 xl:mx-10 3xl:mx-40'>
         <Watch_Frame URL={Setting_Options.find((v)=>v.SettingName==='Auto Play Trailers')?.isActive ? `${TrailerUrl}?autoplay=1&mute=1` : TrailerUrl}/>
        </div>
        )} 
      {!isFetched &&(<Loading loadtype={`${CurrentItem.type} Trailer`}/>)}
      {isError &&(<p className='Non_Data_State'>{error.message}</p>)}

      {/* Item Info */}

      <div className='Outer_Section_Background mx-5 xl:mx-10 3xl:mx-40 my-5 rounded-xl border-3 Border_Color Border_Hover text-lg xl:text-xl'>
        <section className=' lg:w-[40%] flex justify-between items-center font-semibold mt-5 text-xl xl:text-2xl '>
          <p className='mx-2'>{StartDate?.slice(0,4)}</p>
          {CurrentItem.type==='Movie' &&(
            <p className='flex items-center'>
              <FaRegClock className={`${Hour>0 ? '' : 'mx-1.5'}`}/>{Hour>0 &&(<span className='mx-1.5'>{Hour}hr</span>)}{Math.floor(Number(extradata.runtime)%60)}m
            </p>)}
          {CurrentItem.type==='TvShow' && (<p title='Status of the Show Production'>{extradata.status}</p>)}
          <p className="flex items-center mr-2"><FaStar className='text-yellow-400 mb-px mx-1'/>{CurrentItem.vote_average.toFixed(2)}</p>
        </section>

        <div className={`flex flex-col lg:grid ${!Setting_Options.find((v)=>v.SettingName==='Spoiler free mode')?.isActive ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} my-5 `}>
          {!Setting_Options.find((v)=>v.SettingName==='Spoiler free mode')?.isActive &&(
          <article className='my-2 lg:my-0'>
            <h2 className={`ml-2  ${title_value}`}>{CurrentItem.type==='TvShow' ? 'Show' : 'Movie'} Summary</h2>
            <p className='mx-2 Secondary_Text_Color '>{CurrentItem.overview}</p>
          </article>)}

          <article className='mx-2'>
            <h2 className={title_value}>Genres</h2>
            <section className='flex flex-col sm:flex-row sm:justify-evenly sm:items-center'>
              {extradata?.genres?.map((v)=><p className='my-2 Secondary_Text_Color' key={v.name}>{v.name}</p>)}
            </section>
             
            <h2 className={title_value}>Made by</h2>
            <section className={`grid ${extradata?.production_companies?.length===1 ? 'grid-cols-1' : 'grid-cols-2'} gap-5 text-center `} >
               {extradata?.production_companies?.map((v)=><p className='Secondary_Text_Color ' key={v.name}>{v.name}</p>)}
           </section>
          </article>
        </div>
      </div>
      
      {/* Watch Movie */}

      {isFetched && !isError && CurrentItem.type==='Movie' &&(
        <div className='mx-5 xl:mx-10 3xl:mx-40'>
          <Watch_Frame URL={WatchItemUrl}/>
        </div>
        )} 
      {!isFetched && CurrentItem.type==='Movie' &&(<Loading loadtype={`Movie frame`}/>)}
      {isError && CurrentItem.type==='Movie' &&(<p className='Non_Data_State'>{error.message}</p>)}
    
      {/* Watch tv and choose season and episode */}

      {CurrentItem.type==='TvShow' && (
      <nav id='Show' className=' mx-5 xl:mx-10 3xl:mx-40' >
        {isFetched && !isError &&(<Watch_Frame URL={WatchItemUrl}/>)}
        {!isFetched && (<Loading loadtype={'Show Frame'}/>)}
        {isError && (<p className='Non_Data_State'>{error.message}</p>)}
      </nav>)}

      {(SeasonAmount.length>1 && Episodes.episodes.length>0) &&(
        <div className={`text-center ${Setting_Options.find((v)=>v.SettingName==='Episode View Style')?.isActive ? 'my-5' : 'mt-5'}`}>
           <select value={stats.season} className='Outer_Section_Background rounded-lg text-lg text-center xl:text-xl border-2 Border_Color Border_Hover w-55 mx-5 h-10 ' 
            onChange={(e)=>{setstat('season',Number(e.target.value));setstat('episode',1)}}>
              {SeasonAmount.map((v,i)=><option className='Inner_Section_Background Bg_Hover' key={i} value={v.season_number}>Season {v.season_number}</option>)}
           </select>
        </div>)}
    
      {CurrentItem.type==='TvShow' && (
      <div className={`${!Setting_Options.find((v)=>v.SettingName==='Episode View Style')?.isActive
        ? 'flex flex-col'
        : 'grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5'}
           `}>
        {Episodes.episodes.map((v)=>(<EpisodeFrame key={v.id} EpisodeInfo={v}/>))}
      </div>
    )}
    </div>
   )}}
export default Watch_Stream