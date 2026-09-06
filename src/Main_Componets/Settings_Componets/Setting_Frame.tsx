
import type { Setting_Frame } from "./Setting_types"

import {motion} from "motion/react"

function SettingFrame({Option,Get_Option}:{Option:Setting_Frame,Get_Option:(Settingname:string,New_value:boolean)=>void}){
  return(
    <div className="border-b-3 Border_Color">
      <h1 className=" text-2xl lg:text-3xl font-bold pl-1 mt-1">{Option.SettingName}</h1>
      <p className= " text-lg  lg:text-xl  my-2 Secondary_Text_Color px-2 ">{Option.Summery}</p>
      <main 
       onClick={()=>{Get_Option(Option.SettingName,Option.isActive)}}
       className="Outer_Section_Background flex justify-between items-center py-2 cursor-pointer Bg_Hover">
        <h3 className=" text-xl lg:text-2xl ml-1 font-semibold select-none ">{Option.SettingName}</h3>
        <section className={`w-13 h-6.5 my-2 mr-1 ${Option.isActive ? 'bg-[#201f22] dark:bg-[#323031]' : 'dark:bg-[#0f172a] bg-black '} border-3 Border_Color rounded-full`}>
           <motion.p initial={{x:Option.isActive ? -5 : 30}} animate={{x:Option.isActive ? 30 : -5}} transition={{type:'spring', stiffness:100}} 
            className='bg-movie-purple dark:bg-light-movie-purple hover:bg-movie-red dark:hover:bg-light-movie-red w-5 h-full hover: rounded-full'>
           </motion.p>
        </section>
      </main>
    </div>
  )
}
export default SettingFrame