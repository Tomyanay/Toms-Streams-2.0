
 import { Outlet,NavLink,useNavigate } from "react-router-dom" 
 import { useState,useEffect } from "react"

 import { IoIosSettings } from "react-icons/io";
 import { AnimatePresence} from "motion/react";

 import Settings from "../Settings_Componets/Settings"
 import Searchbar from "./Search_Componets/Searchbar";

 import { Alldata } from "./Layout_data";
 
 import { Setting_store } from "../Settings_Componets/Settings_Store";

function Layout() {

  const nav=useNavigate()

  const [SettingMode,ActivateMode]=useState<boolean>(false)

  const {Setting_Options}=Setting_store()

  /* Applying the light Mode when refreshing or opening the website */
  useEffect(()=>{if(Setting_Options.find((v)=>v.SettingName==='Light Mode')?.isActive){document.documentElement.classList.add('dark')}},[Setting_Options])

  return (
    <div className='m-0.5 Outer_Section_Background rounded-md shadow-(--Dark_Shadow) dark:shadow-(--Light_Shadow) border-3 Border_Color'>
      <div className=" flex lg:flex-row flex-col justify-between xl:justify-around items-center py-3 text-3xl xl:text-4xl border-b-3 Border_Color sticky top-0 ">
        <h1 className='Title_color select-none text-4xl xl:text-5xl my-2 lg:my-0 lg:mx-1 font-semibold cursor-pointer ml-2'
         onClick={()=>{nav('/')}} title="To Main Page">Tom's Streams</h1>

        <Searchbar/>

        <p className="my-2 lg:my-0 lg:mx-1 "><NavLink className={({isActive})=>`${isActive && !SettingMode ? 'accent_Color' :'Red_Text_Color'}`} to={'/'}>Home</NavLink></p>
        <p className="my-2 lg:my-0 lg:mx-1 "><NavLink className={({isActive})=>`${isActive && !SettingMode ? 'accent_Color': ' Red_Text_Color'}`} to={'/About'}>About</NavLink></p>
        
        <section className="mr-2">
          <section className={`flex items-center my-2 lg:my-0 cursor-pointer
            ${SettingMode ? 'accent_Color' : 'Red_Text_Color'}`}
            onClick={()=>{ActivateMode(true)}}>
            <IoIosSettings className="text-3xl xl:text-4xl"/>
            <p>Settings</p>
          </section>
           <AnimatePresence>
            {SettingMode && (
            <>
             <Settings ActivateMode={ActivateMode}/>
             <div className="fixed inset-0 bg-black/60 z-20"></div>
            </>
            )}
           </AnimatePresence>
        </section>
      </div>

      <Outlet/>

      <footer className="flex flex-col justify-center items-center border-t-3 Border_Color">
        <p className='text-4xl xl:text-5xl Title_color mt-5 font-semibold'>
          &copy; Tom yanay 2026{new Date().getFullYear()>2026 ? - new Date().getFullYear() : ''}
        </p>
        <div className="flex justify-between items-center">
           {Alldata.map((value,index)=>
            <a onDragStart={(e)=>e.preventDefault()} className="select-none" key={index} href={value.SiteLink} target="_blank" title={value.title}>
             <img className="w-20 h-20 xl:w-25 xl:h-25 my-5 mx-2.5 rounded-full border-3 Border_Color Border_Hover" 
              src={value.Imgurl} 
              alt={value.title}/>
            </a>)}
        </div>
      </footer>
    </div>
  )
}
export default Layout
