
export type Trailertype={
    genres:{name:string}[],
    production_companies:{name:string}[]
    runtime?:number
    status:string,
    seasons:{season_number:number,episode_count:number}[]
    videos:{results:{key:string,site:string,type:string}[]}
}

export type ExactEpisode={
    stats:{season:number,episode:number},
    setstat:(type:string,value:number)=>void,
    resetstat:()=>void
}

export type Episodes={
      id:number,
      air_date:string,
      episode_number:number,
      name:string,
      overview:string,
      still_path:string,
      vote_average:string,
      runtime:number
}


export type TvSeason={
    episodes:Episodes[]
} 