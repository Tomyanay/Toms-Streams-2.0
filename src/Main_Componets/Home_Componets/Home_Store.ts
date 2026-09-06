
import {create} from 'zustand'
import { persist } from "zustand/middleware"
import type { HomeStore } from './Home_types'

export const Home_Store=create<HomeStore>()(persist((set)=>({
    CurrentItem:'a',
    setCurrentItem:(Item)=>set({CurrentItem:Item}),

    ChosenType:'Movies',
    setType:(Type)=>set({ChosenType:Type}),

    Currentpage:1,
    Incresepage:()=>set((state)=>({Currentpage:state.Currentpage+1})),
    Decresepage:()=>set((state)=>({Currentpage:state.Currentpage-1})),
    resetpage:()=>set({Currentpage:1}),

    LikedIndex:0,
    IncreseIndex:()=>set((state)=>({LikedIndex:state.LikedIndex+20})),
    DecreseIndex:()=>set((state)=>({LikedIndex:state.LikedIndex-20})),
    ResetIndex:()=>set({LikedIndex:0})


}),{name:'Home'}))