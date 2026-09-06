
import { create } from "zustand";
import {persist} from 'zustand/middleware'
import type { Searchshop } from "../Layout_types";

export const SearchShop=create<Searchshop>()(persist((set)=>({
    SearchedItem:'',
    setItem:(value)=>set({SearchedItem:value})
}),{name:'Search'}))