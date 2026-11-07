
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
        <div className="w-80 sm:w-100 xl:w-110 text-lg sm:text-xl relative h-12 lg:my-0 lg:mx-1 border-3 Border_Color rounded-lg ">
          <FaMagnifyingGlass className=" absolute top-3 left-2 Red_Text_Color text-xl"/>
          <input 
          className="w-[90%] h-full pl-8 font-Montserrat text-b outline-0" 
          type="text" 
          placeholder='Search for Movies & Tv Shows' 
          value={SearchedItem}
          onChange={(e)=>AutoSearch(e)}
          autoComplete="off" 
          name="Search"
          maxLength={33}/>
          {SearchedItem!=='' && (
          <FaXmark 
          className="absolute top-2.5 right-1 Red_Text_Color text-2xl "  
          onClick={()=>{setItem('');nav(`/Search/?query=`)}} />)}
        </div>
      </form>
  )
}

export default Searchbar