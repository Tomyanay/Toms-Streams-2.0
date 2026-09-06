
 import {motion} from 'motion/react'
 
 import { globalstore } from "../Global_Store";

function WarrningMessage({ID,setMessage}:{ID:number,setMessage:React.Dispatch<React.SetStateAction<boolean>>}) {

  const {RemoveLikedItem}=globalstore() 
  
  return (
    <div onClick={(e)=>e.stopPropagation()} className=" fixed inset-0 flex justify-center items-center bg-black/60 z-20">
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1, ease:'easeInOut'}}
          className="Outer_Section_Background w-85 md:w-100 lg:w-110 border-3 Border_Color rounded-lg ">
          <section className='flex items-center justify-between'>
           <h1 className='ml-2 text-xl xl:text-2xl Title_color font-bold'>Remove Liked Item</h1>
           <p 
           className="my-1 cursor-pointer text-xl xl:text-2xl mr-2 font-semibold Red_Text_Color Text_Hover"
           onClick={(e)=>{e.stopPropagation();setMessage(false)}}>X</p>
          </section>
      
          <p className=" my-1.5 ml-2 text-lg xl:text-xl">Are you sure you want to remove this item from your liked item pool?</p>
         
          <section className="text-center my-2">
           <button
           onClick={(e)=>{e.stopPropagation();setMessage(false);RemoveLikedItem(ID)}}
           className="border-3 Border_Color Outer_Section_Background rounded-lg text-lg xl:text-xl cursor-pointer Secondary_Text_Color Border_Hover p-2 font-Roboto"
           >Confirm
           </button>
          </section>
         </motion.div>
    </div>
  )
}

export default WarrningMessage