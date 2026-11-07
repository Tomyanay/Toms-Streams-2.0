
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

import Loading from "../../Globals/GlobalComponets/Loading"
import ItemCard from "../../Globals/GlobalComponets/ItemCard"
import Back_To_Top from "../../Globals/GlobalComponets/Back_To_Top"

import { SearchShop } from "./SearchShop"

import { useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import useDebounce from "./useDebounce"

import type { Item } from "../../Globals/Global_types"

import { WatchedOptions } from "../../Home_Componets/Home_data"

function Results() {
  
  const APIKEY=import.meta.env.VITE_APIKEY

  const {SearchedItem,setItem}=SearchShop()

  const [CurrentSearchItem]=useSearchParams()

  const search=useDebounce(CurrentSearchItem.get('query')) as string

  const [AllResults,setResults]=useState<Item[]>([])
  const DuplicateCheck=useRef<Set<number>>(new Set())
  const [Searching,setSearching]=useState(false) //Check serach mode for showing right message
  const [WatchedChoice,setChoice]=useState({All:true,Movies:false,Shows:false})

  const WatchedFinal= WatchedChoice.All ? [...AllResults] : (WatchedChoice.Movies ? [...AllResults].filter((v)=>v.type==='Movie') : [...AllResults].filter((v)=>v.type==='TvShow'))

  function Set_Watched_Filters(option:string){
    const WatchedCopy={...WatchedChoice}
    for (const key in WatchedCopy){
        if(key===option){WatchedCopy[key as keyof typeof WatchedCopy]=true}
        else{WatchedCopy[key as keyof typeof WatchedCopy]=false}}
    setChoice(WatchedCopy)
  }

  async function GetResult(){
    let Datalist:Item[]=[]
    DuplicateCheck.current.clear()
    if(search===''){
      setResults([])
      setItem('')
      setSearching(false)
      return ''}
      
  try{
    for(let i=0;i<2;i++){
      const Itemtype = i===0 ? 'tv':'movie';
      const Maxpage=4
      
      for(let item=1;item<=Maxpage;item++){
          const respond =await axios.get(`https://api.themoviedb.org/3/search/${Itemtype}?api_key=${APIKEY}&page=${item}&query=${search}`)
          const Fresh_Data:Item[]=respond.data.results
          const Data=Fresh_Data.map((v)=>{return {...v,type:Itemtype==='tv' ? 'TvShow' : 'Movie'}})
          Data.forEach((v)=>{
            if(DuplicateCheck.current.has(v.id)){return }
            else{
              DuplicateCheck.current.add(v.id)
              Datalist.push(v)}})}
    }
    Datalist=Datalist.sort((a,b)=>b.popularity - a.popularity)
    if(search!==SearchedItem){setItem(search as string)}
    Datalist=Datalist.filter((v)=>v.poster_path!==null && v.vote_average>0)
    setResults(Datalist)
    setSearching(true)
    return ''
    }
    catch(error){console.log(error)}

  }

  const {isLoading,isError,error}=useQuery({queryKey:['Result',search],queryFn:GetResult})

  console.log(SearchedItem)

  return (
    <div className={`Inner_Section_Background p-5 xl:px-10 3xl:px-15 `}>
      {isLoading && (<Loading loadtype={'Results'}/>)}
      {isError &&(<p className="Non_Data_State">{error.message}</p>)}
      {!isLoading && !isError && AllResults.length===0 && (
        <p className="Non_Data_State">
        {(SearchedItem!=='' && Searching) ? `No results found for ${SearchedItem}` : 'Search an item in order to see results' }
        </p>)}

      {(!isLoading && AllResults.length>0) && (
      <nav id="Container" className="scroll-m-100">
        <h1 className='pl-2 text-2xl sm:text-3xl xl:text-4xl mt-5 font-bold'>{WatchedFinal.length} Results Found for: <span className="normal-case Title_color">{SearchedItem}</span></h1>
        <div className="my-10 border-3 Border_Color rounded-lg">
          <section className=" py-5 flex justify-evenly ">
              {WatchedOptions.map((v,i)=>(
              <p className={`text-xl sm:text-2xl xl:text-3xl font-semibold cursor-pointer ${WatchedChoice[v as keyof typeof WatchedChoice] ? 'accent_Color' : 'Red_Text_Color'}`}
                 key={i}
                 onClick={()=>Set_Watched_Filters(v)}>
                {v}
              </p>))}
          </section>
          
          <section>

            {WatchedFinal.length>20 && (<Back_To_Top/>)}

            <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 p-7">
               {WatchedFinal.map((v)=><ItemCard key={v.id} ItemInfo={v}/>)}
            </section> 
          {WatchedFinal.length===0 &&(<p className="Non_Data_State">You didnt watch any items of these type</p>)}  
          </section>      
        </div>
       </nav>)} 
    </div>
  )
}
export default Results