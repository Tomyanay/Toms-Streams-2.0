
import { create } from "zustand";
import {persist} from 'zustand/middleware'
import type { Globalstore } from "./Global_types";


export const globalstore=create<Globalstore>()(persist((set)=>({
    LikedItems:[],
    AddlikedItem:(item)=>set((state)=>({LikedItems:[...state.LikedItems,item]})),
    RemoveLikedItem:(Id)=>set((state)=>({LikedItems:state.LikedItems.filter((v)=>v.id!==Id)})),

    WatchedItems:[],
    AddWatchedItem:(Item)=>set((state)=>({WatchedItems:[...state.WatchedItems,Item]})),
    RemoveWatchedItem:(id)=>set((state)=>({WatchedItems:state.WatchedItems.filter((v)=>v.id!==id)}))


}),{name:'Global'}))
