
import type { Item } from "../Globals/Global_types"

export type HomeStore={
    CurrentItem:Item | 'a',
    setCurrentItem:(value:Item)=>void,
    
    ChosenType:string,
    setType:(type:string)=>void,

    Currentpage:number,
    Incresepage:()=>void,
    Decresepage:()=>void,
    resetpage:()=>void,

    LikedIndex:number,
    IncreseIndex:()=>void,
    DecreseIndex:()=>void,
    ResetIndex:()=>void,
}

export type Ordered={
    name:string,
    value:string
}

