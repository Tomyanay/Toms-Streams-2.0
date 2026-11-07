
import {motion,useScroll,useTransform} from 'motion/react'
import { FaArrowUp } from "react-icons/fa";

function Back_To_Top() {

  const {scrollYProgress}=useScroll()
  const pointerEvents = useTransform(scrollYProgress, (val) => ((val<0.05) ? "none" : "block"));

  return (
    <motion.a 
     style={{display:pointerEvents}} href="#Container" 
     title="Back to top"
     className=" fixed bottom-10 right-[10%] md:right-[7%] lg:right-[4.5%] xl:right-[4%] Outer_Section_Background p-2 z-10 border-5 Border_Color Border_Hover cursor-pointer rounded-full">
     <FaArrowUp className="Red_Text_Color Text_Hover text-4xl"/>
    </motion.a>
  )
}

export default Back_To_Top