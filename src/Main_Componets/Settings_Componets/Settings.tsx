
import {motion} from "motion/react"

import { IoIosSettings } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

import { Setting_store } from "./Settings_Store";

import SettingFrame from "./Setting_Frame";

function Settings({ActivateMode}:{ActivateMode:React.Dispatch<React.SetStateAction<boolean>>}) {

  const {Setting_Options,Set_Option}=Setting_store()

  function Get_Option(Settingname:string,new_value:boolean){
      Set_Option(Settingname,!new_value)
      if(Settingname==='Light Mode'){document.documentElement.classList.toggle('dark')}}
  
  return (
     <motion.div 
      exit={{x:'-100%'}} initial={{x:'-100%'}} animate={{x:0}} transition={{duration:.5, ease:'easeInOut'}} 
      className="Inner_Section_Background fixed inset-0 w-75 lg:w-90 xl:w-110 z-30 border-3
      border-b-0 border-l-0 Border_Color overflow-y-auto NoScrollbar">
      
      <header className="flex justify-between items-center Red_Text_Color Outer_Section_Background border-b-3 Border_Color py-1.5 select-none ">
        <FaArrowLeft onClick={()=>{ActivateMode(false)}} className="text-[33px] xl:text-4xl ml-2 cursor-pointer Text_Hover"/>
        <section className="flex items-center justify-evenly mr-2 ">
          <IoIosSettings className="text-3xl xl:text-4xl "/>
          <p>Settings</p>
        </section>
      </header>

       <main>
          {Setting_Options.map((value,index)=><SettingFrame key={index} Option={value} Get_Option={Get_Option}/>)}
       </main>
     </motion.div>
  )
}
export default Settings






