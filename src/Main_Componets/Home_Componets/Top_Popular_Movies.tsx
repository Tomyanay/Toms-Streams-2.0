
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import Loading from '../Globals/GlobalComponets/Loading';

import type { Item } from '../Globals/Global_types';

import {FaChevronRight,FaChevronLeft,FaStar,FaPlay } from "react-icons/fa";

import {TVGenres,MovieGenres} from './Home_data'


/* Tailwind value */
 const arrows='absolute top-[50%] text-3xl xl:text-5xl Red_Text_Color Text_Hover ' 

function Top_Popular_Movies() {
   const nav=useNavigate()
   const [CurrentShownItem,setShownItem]=useState<Item | 'a'>('a')
   const [Genre,setGenre]=useState<string[]>([])
   const Index=useRef(0)
   const AllItems=useRef<Item[]>([])

   const [SlideWidth,setWidth]=useState(100)


   const Currentyear=new Date().getFullYear()
   
   function SetWatch(){if(CurrentShownItem!=='a'){nav(`/Watch/${CurrentShownItem.type}/${String(CurrentShownItem.id)}`)}}
  
   function MoveItem(side:string){

      if(side==='Left'){
        if(Index.current>0){
           Index.current-=1
           setShownItem(AllItems.current[Index.current])}
        else{
           Index.current=AllItems.current.length-1
           setShownItem(AllItems.current[Index.current])}}

      else if(side==='Right'){
         if(Index.current<AllItems.current.length-1){
           Index.current+=1
           setShownItem(AllItems.current[Index.current])}
        else{
           Index.current=0
           setShownItem(AllItems.current[Index.current])}}

      if(AllItems.current[Index.current].type==='TvShow'){
          const GenerArray=AllItems.current[Index.current].genre_ids.map((v)=>TVGenres[String(v) as keyof typeof TVGenres])
          setGenre(GenerArray)}

      else{
          const GenerArray=AllItems.current[Index.current].genre_ids.map((v)=>MovieGenres[String(v) as keyof typeof MovieGenres])
          setGenre(GenerArray)}

      setWidth(100)
   }

  async function GetTopItems() {
      const APIKEY=import.meta.env.VITE_APIKEY
      let Item_Array:Item[]=[] /* Preventing bug of Timer calling MoveItem while the request is pending */
      Index.current=0   /* Reseting index each time we mount the home componet again */
      for(let i=0;i<2;i++){
       const Itemtype= i===0 ? 'movie' : 'tv' 
       const YearCheck= i===0 ? `primary_release_year` : `first_air_date_year`

       const response=await axios.get(`https://api.themoviedb.org/3/discover/${Itemtype}?api_key=${APIKEY}&${YearCheck}=${Currentyear}&page=1&vote_average.gte=6&vote_count.gte=150`)
       
       const Fresh_Data:Item[]=response.data.results
       const Data=Fresh_Data.map((v)=> {return {...v,type:Itemtype==='tv' ? 'TvShow' : 'Movie'}})
       Data.forEach((v)=>Item_Array.push(v))
      }
      Item_Array=Item_Array.sort((a,b)=>b.popularity-a.popularity) 
      AllItems.current=Item_Array
      setShownItem(AllItems.current[Index.current])
      MoveItem('Right')
      return ''
  }
   const {isFetched,isError,error}=useQuery({queryKey:['Top Popular'],queryFn:GetTopItems})
   
   useEffect(()=>{
    /* 8000 milseconds */
    const auto=setInterval(()=>{
      setWidth(sw=>sw-1.25)  
    },100)
    if(SlideWidth===0){
       MoveItem('Right')
    }
    return ()=>clearInterval(auto)},[CurrentShownItem,SlideWidth])
 
   if(CurrentShownItem!=='a'){
     
    const ItemName= CurrentShownItem.type==='TvShow' ? CurrentShownItem.name : CurrentShownItem.title
    return (
     <>
      {(error==null && isFetched) && (
        <div 
         style={{
         backgroundImage:`url(https://image.tmdb.org/t/p/w780/${CurrentShownItem.backdrop_path})`,
         backgroundRepeat: "no-repeat ",
         backgroundSize: "100% 100%",
         backgroundPosition: "top center"}} 
         className=' rounded-lg relative flex flex-col justify-between  border-3 Border_Color Border_Hover'>

         <h1 className="Title_color pl-2 text-3xl xl:text-4xl select-none font-bold  mt-5 mx-1">Most Popular Items of {Currentyear}</h1>
          <FaChevronLeft onClick={()=>MoveItem('Left')} className={`${arrows}  left-1`}/>
          <FaChevronRight onClick={()=>MoveItem('Right')} className={`${arrows} right-1`}/>

         <div className='w-full absolute top-0 h-2.5'>
            <p style={{width:`${SlideWidth}%`}} className='bg-movie-red dark:bg-light-movie-red h-full rounded-sm'></p>
         </div> 

          <div className="pl-2 mt-40 xl:mt-45 select-none text-2xl xl:text-[26px]">
            <h2 className=' font-semibold  mt-15 xl:mt-17 line-clamp-1 Text_Shadow'>{ItemName}</h2>
            <section className="my-3 flex justify-between items-center w-[70%] md:w-[45%] lg:w-[30%] font-semibold">
              <p className='Text_Shadow'>{CurrentShownItem.type==='TvShow' ? 'Tv Show' : CurrentShownItem.type}</p>
              <p className='Text_Shadow'>{CurrentShownItem.original_language}</p>
              <p className="flex items-center Text_Shadow"><FaStar className='text-yellow-400 mb-px mx-1'/>{CurrentShownItem.vote_average.toFixed(2)}</p>
            </section>
          
            <section className="my-2 Text_Shadow">
              <p>{Genre.join(' & ')}</p>
            </section>

            <button 
             onClick={SetWatch}
             className='flex cursor-pointer justify-start items-center my-3 font-Roboto  Red_Text_Color Text_Hover Text_Shadow'>
            <FaPlay className='mx-1'/> Click To Watch</button>  
          </div>
        </div> )}
      {!isFetched &&(<Loading loadtype={'Top Items'}/>)}
      {isError &&(<p className='Non_Data_State'>{error.message}</p>)}
     </>    
  )}
}

export default Top_Popular_Movies