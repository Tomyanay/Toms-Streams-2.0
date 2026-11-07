
import { create } from "zustand";
import  {persist} from 'zustand/middleware'
import type { ExactEpisode } from "./Watch_Stream_types";


export const WatchShop=create<ExactEpisode>()(persist((set)=>({
    stats:{season:1,episode:1},
    setstat:(type,value)=>set((state)=>({stats:{...state.stats,[type]:value}})),
    resetstat:()=>set({stats:{season:1,episode:1}})
}),
{name:'Watch'}))