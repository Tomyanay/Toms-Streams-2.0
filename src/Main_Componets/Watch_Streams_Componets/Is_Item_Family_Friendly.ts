
import axios from "axios";
import type { Dates } from "../Globals/Global_types";

async function Is_Item_Family_Friendly(id:number,APIKEY:string,ApiType:string):Promise<boolean>{

    /* Checking the certification based on the item type and making sure they are all pg */
    if(ApiType==='movie'){
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${APIKEY}`);
        const UsDates:Dates[]=response.data.results
        const US=UsDates.find((v)=>v.iso_3166_1==='US')
        if(!US){return false}
        const certification=US.release_dates?.map((v)=>v.certification)
        if(!certification){return false}
        return certification?.some((v)=>['G', 'PG'].includes(v))
     }
    
   if(ApiType==='tv'){
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${APIKEY}`);
        const UsDates:Dates[]=response.data.results
        const US=UsDates.find((v)=>v.iso_3166_1==='US')
        if(!US){return false}  
        return ['TV-Y', 'TV-Y7', 'TV-G'].includes(US.rating as string);
   }
     return true
} 

export default Is_Item_Family_Friendly