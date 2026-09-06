
 import type { Item } from "../Globals/Global_types";

 import axios from "axios";
 import { useQuery } from "@tanstack/react-query";

 import { globalstore } from "../Globals/Global_Store";
 import { Setting_store } from "../Settings_Componets/Settings_Store";
 import { Home_Store } from "./Home_Store";

 import ItemCard from "../Globals/GlobalComponets/ItemCard";
 import Top_Popular_Movies from "./Top_Popular_Movies";
 import Loading from "../Globals/GlobalComponets/Loading";

 import { useState } from "react";

 import { MovieGenres,TVGenres,WatchedOptions,ItemOptions,Years,Order} from "./Home_data";

 import { FaArrowRight,FaArrowLeft } from "react-icons/fa";

 import {motion} from 'motion/react'

 /* Tailwind values */
 const DropDownclass='Outer_Section_Background rounded-lg my-2 text-lg xl:text-xl border-2 Border_Color Border_Hover w-55 pl-3 pt-0.5 mx-5 h-10'

function Home() {

  const APIKEY=import.meta.env.VITE_APIKEY 

  const {WatchedItems,LikedItems}=globalstore()
  const {Setting_Options}=Setting_store()
  const {ChosenType,setType,Currentpage,Incresepage,Decresepage,resetpage,LikedIndex,IncreseIndex,DecreseIndex,ResetIndex}=Home_Store()

  const [WatchedChoice,setChoice]=useState({All:true,Movies:false,Shows:false})
  const [Items,setItems]=useState<Item[]>([])
  const [TotalBasicNumber,setNumber]=useState(0)

  const [ChosenYear,setYear]=useState('2026')
  const [CurrentGenre,setGenere]=useState('0')
  const [CurrentOrder,setOrder]=useState('popularity.desc')

  const Genretype=ChosenType==='Movies' ? MovieGenres : TVGenres
  const GenresArray=[Object.keys(Genretype),Object.values(Genretype)]

  const DisableRightcon= ChosenType!=='Liked Items' ? Currentpage===TotalBasicNumber : 20*Currentpage>=LikedItems.length 
  if(20*(Currentpage-1)===LikedItems.length && Currentpage!==1 && ChosenType==='Liked Items'){Decresepage();DecreseIndex()} /* Go back a page if last liked item of a page is deleted */

  function SetPage(choice:string){
      if(choice==='next'){Incresepage()}
      else{Decresepage()}
  
      if(ChosenType==='Liked Items'){
        if(choice==='next'){IncreseIndex()}
        else{DecreseIndex()}
      }}

  function Set_Watched_Filters(option:string){
    const WatchedCopy={...WatchedChoice}
    for (const key in WatchedCopy){
        if(key===option){WatchedCopy[key as keyof typeof WatchedCopy]=true}
        else{WatchedCopy[key as keyof typeof WatchedCopy]=false}}
    setChoice(WatchedCopy)
  }

  const WatchedFinal= WatchedChoice.All ? [...WatchedItems] : 
  (WatchedChoice.Movies ? [...WatchedItems].filter((v)=>v.type==='Movie') : [...WatchedItems].filter((v)=>v.type==='TvShow') )

  async function GetItems(){
    if(ChosenType!=='Liked Items'){
      const type= ChosenType==='Movies' ? 'movie' : ChosenType==='Shows' && 'tv'
      const yearparam =type=== "tv" ? "first_air_date_year" : "primary_release_year";
      const voteCountFix = CurrentOrder.includes("vote_average") ? "&vote_count.gte=150": ""
      const Genre=CurrentGenre==='0' ? '' : CurrentGenre

      const Response= await axios.get(`https://api.themoviedb.org/3/discover/${type}?api_key=${APIKEY}&page=${Currentpage}&${yearparam}=${ChosenYear}
      &with_genres=${Genre}&sort_by=${CurrentOrder}${voteCountFix}&vote_average.gte=6`)
      
      const pagenumber:number=Response.data.total_pages
      setNumber(pagenumber)

      const FreshData:Item[]=Response.data.results
      let Data=FreshData.map((v)=> {return{...v,type:type==='tv' ? 'TvShow' : 'Movie'}})
      Data=Data.filter((v)=>v.poster_path!==null && v.vote_average>0)
      setItems(Data)
      return ''}

    else{return ''} }

  const {isFetched,isError,error}=useQuery({queryKey:['ShowItems',ChosenYear,ChosenType,CurrentGenre,Currentpage,CurrentOrder],queryFn:GetItems})

  return (
  <div className="Inner_Section_Background py-5 px-5 xl:px-10 3xl:px-15 ">

      {/* Top 20 Most Popular movies of Current year */}

      <Top_Popular_Movies/>

      {/* Watched Items Categories */}

       {!Setting_Options.find((v)=>v.SettingName==='Hide Watched Items')?.isActive && (
        <motion.section 
        initial={{opacity:0,y:20}} 
        whileInView={{opacity:1,y:0}} 
        viewport={{once:true}}
        transition={{duration:1}}
        className="my-10 border-3 Border_Color rounded-lg">
          <h1 className="Title_color pl-2 text-3xl xl:text-4xl select-none font-bold mt-5 mx-1">Continue to Watch</h1>
          <section className="mt-10 flex justify-evenly  ">
              {WatchedOptions.map((v,i)=>(
              <p className={`text-2xl xl:text-3xl font-semibold cursor-pointer ${WatchedChoice[v as keyof typeof WatchedChoice] ? 'accent_Color' : 'Red_Text_Color'}`}
                 key={i} 
                 onClick={()=>Set_Watched_Filters(v)}>
                {v}
              </p>))}
          </section>

        {/* Watched Items Cards */}
          <div className="my-5 xl:my-15 ">
            {WatchedFinal.length>0 &&(
            <section className="pl-[5%] sm:pl-[13%] md:pl-[12%] lg:pl-[7%] 2xl:pr-[5%] 3xl:-mx-20 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 ">
             {WatchedFinal.map((v)=><ItemCard key={v.id} ItemInfo={v} />)}
            </section>)}
            {WatchedFinal.length===0 &&(<p className="Non_Data_State">You didnt watch any items of these type</p>)}
          </div>
        </motion.section>)}

      
     <motion.div 
        initial={{opacity:0,y:20}} 
        whileInView={{opacity:1,y:0}} 
        viewport={{once:true}}
        transition={{duration:1}}
        className="my-10 border-3 Border_Color rounded-lg">

        {/* Item Categories */}

        <section className="flex justify-evenly my-10">
          {(ItemOptions.map((v,i)=>
          <p 
           className={`text-2xl xl:text-3xl font-semibold cursor-pointer ${v===ChosenType ? 'accent_Color' : 'Red_Text_Color'}`}
           key={i}
           onClick={()=>{setType(v);setGenere('0');setOrder('Most Popular');resetpage();ResetIndex()}}>
           {v}
           </p>
          ))}
        </section> 
      
      {/* Item Genres */}

      {ChosenType!=='Liked Items' &&(
       <div className="flex flex-col md:flex-row justify-evenly items-center Outer_Section_Background p-5 md:p-6 m-5 border-3 Border_Color rounded-lg relative ">
           <select id="Year" value={ChosenYear} onChange={(e)=>setYear(e.target.value)} className={`${DropDownclass}`}>
            {Years.map((v)=><option className='Inner_Section_Background Bg_Hover' value={v} key={v}>{v}</option>)}
           </select>

            <select id="Genre" value={CurrentGenre} onChange={(e)=>setGenere(e.target.value)} className={`${DropDownclass}`} >
              {GenresArray[1].map((v,i)=><option key={v} value={GenresArray[0][i]} className='Inner_Section_Background Bg_Hover'>{v}</option>)}
            </select>
            
            <select id="Order by" value={CurrentOrder} onChange={(e)=>setOrder(e.target.value)} className={`${DropDownclass}`}>
              {Order.map((v)=><option key={v.name} value={v.value} className='Inner_Section_Background Bg_Hover'>{v.name}</option>)}
            </select>
        </div>
      )}
        
       {/* Item Cards */} 
      <div>  
        {(ChosenType!=='Liked Items' && isFetched) &&(
        <section className=" pl-[5%] sm:pl-[13%] md:pl-[12%] lg:pl-[7%] 2xl:pr-[5%] 3xl:-mx-20 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
          {Items.map((v)=><ItemCard key={v.id} ItemInfo={v}/>)}
        </section>)}
         {(!isFetched && ChosenType!=='Liked Items') &&(<Loading loadtype={`Items`}/>)}
         {(isError && ChosenType!=='Liked Items')  &&(<p className='Non_Data_State'>{error.message}</p>)}
         {(Items.length===0 && ChosenType!=='Liked Items') &&(<p className="Non_Data_State">No items were found</p>)}


         {(LikedItems.length>0 && ChosenType==='Liked Items') && (
         <section 
         className=" pl-[5%] sm:pl-[13%] md:pl-[12%] lg:pl-[7%]  grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
          {LikedItems.slice(LikedIndex,LikedIndex+20).map((v)=><ItemCard key={v.id} ItemInfo={v}/>)}
         </section>)}
         {(LikedItems.length===0 && ChosenType==='Liked Items') &&(<p className="Non_Data_State">You dont have any liked items</p>)}
      </div>
    </motion.div>  

      {/* Move Page */} 
    {(ChosenType !=='Liked Items' || LikedItems.length>20) && (
      <div className="flex justify-center items-center text-3xl xl:text-4xl mb-2">
        <button className={`mr-6 Red_Text_Color Text_Hover ${Currentpage===1 && 'cursor-not-allowed'}`} disabled={Currentpage===1} onClick={()=>{SetPage('prev')}} ><FaArrowLeft/></button>
         <p>Page {Currentpage}</p>
        <button className={`ml-6 Red_Text_Color Text_Hover ${DisableRightcon && 'cursor-not-allowed'} `} disabled={DisableRightcon}  onClick={()=>{SetPage('next')}}><FaArrowRight/></button>
      </div>)}
  </div>
  )
}

export default Home