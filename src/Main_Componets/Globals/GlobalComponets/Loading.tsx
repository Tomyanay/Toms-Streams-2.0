
import {motion} from 'motion/react'

import type {Variants} from 'motion/react'

/* Motion values */
 const parenttag:Variants={
  hidden:{opacity:0},
  visible:{opacity:1,
    transition:{
      staggerChildren:1.5,
      duration:1,
      ease:'easeInOut',   
    }}}

 const childtag:Variants={
   hidden:{opacity:0},
   visible:{opacity:1, 
   transition:{
      duration:1,
      ease:'easeInOut',        
    }}}


function Loading({loadtype}:{loadtype:string}) {

 const loading=`Loading ${loadtype}...`.split(' ')

  return (
    <motion.div variants={parenttag} initial='hidden' animate='visible' className="Non_Data_State">
       {loading.map((v,i)=><motion.p variants={childtag} key={i} className='mx-1'>{v}</motion.p>)}
    </motion.div>
  )
}

export default Loading