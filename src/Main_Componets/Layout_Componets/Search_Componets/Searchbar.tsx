
 import { FaXmark,FaMagnifyingGlass} from "react-icons/fa6";

 import { SearchShop } from "./SearchShop";
 
 import { useNavigate } from "react-router-dom";

function Searchbar() {

  const {SearchedItem,setItem}=SearchShop()
  
  const nav=useNavigate()

  function AutoSearch(e:React.ChangeEvent<HTMLInputElement, HTMLInputElement>){
    setItem(e.target.value)
    nav(`/Search/?query=${e.target.value}`) 
  }

  function Search(FormData:FormData){
    const Search=FormData.get('Search') as string
    nav(`/Search/?query=${Search}`)
  }

  return (
      <form action={Search}>
        <div className="w-100 xl:w-110 relative h-12 my-2 lg:my-0 lg:mx-1 ">
          <FaMagnifyingGlass className=" absolute top-3.5 xl:top-4 left-2 Red_Text_Color text-xl xl:text-[22px]"/>
          <input 
          className="w-full h-full pl-8 font-Montserrat text-lg xl:text-xl rounded-md border-3 Border_Color focus:outline-2 focus:outline-hover focus:dark:outline-light-hover " 
          type="text" 
          placeholder='Search for Movies & Tv Shows' 
          value={SearchedItem}
          onChange={(e)=>AutoSearch(e)}
          autoComplete="off" 
          name="Search"
          maxLength={33}/>
          {SearchedItem!=='' && (
          <FaXmark 
          className="absolute top-3.5 xl:top-4 right-2 Red_Text_Color text-xl xl:text-[22px]"  
          onClick={()=>{setItem('');nav(`/Search/?query=`)}} />)}
        </div>
      </form>
  )
}

export default Searchbar