
export type Globalstore={
    LikedItems:Item[],
    AddlikedItem:(Item:Item)=>void
    RemoveLikedItem:(Id:number)=>void,

    WatchedItems:Item[],
    AddWatchedItem:(Item:Item)=>void,
    RemoveWatchedItem:(Id:number)=>void   
}

export type Item={
    adult:boolean,
    backdrop_path:string,
    genre_ids:number[],
    id:number,
    original_language:string,
    name?:string,
    title?:string,
    overview:string,
    popularity:number
    poster_path:string,
    vote_average:number,
    type:string,
    release_date?:string,
    first_air_date?:string
}

export type Dates={
    iso_3166_1:string,
    release_dates?:{certification:string}[],
    rating?:string
}