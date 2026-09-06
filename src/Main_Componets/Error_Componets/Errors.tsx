
 import { useRouteError,isRouteErrorResponse} from 'react-router-dom'

 import Error_Image_png from './assets/Error_Image.png'
 import Not_PG from './assets/Not_Pg.webp'

 import { Link } from 'react-router-dom'
 
 import axios from 'axios'

  /* Tailwind veriables */
  const Maintag='Inner_Section_Background flex flex-col h-screen justify-center items-center'
  const errortag='Secondary_Text_Color mx-2 my-5 xl:mx-0 text-xl xl:text-2xl text-center'
  const Linktag='Red_Text_Color Text_Hover font-semibold'
  const Imagetag='w-150 h-150 select-none border-3 Border_Color Border_Hover rounded-lg '

 function Errors() {

  const error=useRouteError()

  if(isRouteErrorResponse(error)){ //Error is from any source
    const img=String(error.data).includes('PG') ? Not_PG : Error_Image_png
  return (
    <div className={Maintag}>
      <img className={Imagetag} src={img} alt="Error Image" draggable={false} />
      <p className={errortag}>{error.data}<br/>press <Link className={Linktag} to={'/'}> This</Link> to go back to Home </p>
    </div>)}

  else if(axios.isAxiosError(error)){ //Error is from Axios api bad fetch
  return (
    <div className={Maintag}>
      <img className={Imagetag} src={Error_Image_png} alt="Error Image" draggable={false} />
      <p className={errortag}>{error.message}<br/> press <Link className={Linktag} to={'/'}> This</Link> to go back to Home</p>
    </div>)}
    
  else{ //Error is from an unknown source
    return(
      <div className={Maintag}>
        <img className={Imagetag} src={Error_Image_png} alt="Error Image" draggable={false} />
        <p className={errortag}>Unknown Error <br/>press <Link className={Linktag} to={'/'}>This</Link> to go back to main page</p>
      </div>)}
}

export default Errors