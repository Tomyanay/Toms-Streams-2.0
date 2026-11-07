
import {create} from 'zustand'
import { persist } from "zustand/middleware"
import type { Setting_Store} from './Setting_types'

export const Setting_store=create<Setting_Store>()(persist((set)=>({
 Setting_Options:[
  {SettingName:'Light Mode',Summery:'Change the Site looks base on your preference',isActive:false},
  {SettingName:'Episode View Style',Summery:'Choose how the episodes of a Tv shows will be viewed grided or listed (Default is listed)',isActive:false},
  {SettingName:'Adult Mode',Summery:'Enable the ability to watch any adult content you want',isActive:false},
  {SettingName:'Hide Watched Items',Summery:'The Watched Items Section will not appear if this is enabled',isActive:false},
  {SettingName:'Confirm Message',Summery:'Display a message before removing a liked item',isActive:false},
  {SettingName:'Spoiler free mode',Summery:'Hides the summery of a movie and a tv show also blurs episodes images',isActive:false},
  {SettingName:'Show Indicators',Summery:'Display a visual indicator on movies and Tv Shows you watched',isActive:false},
  {SettingName:'Auto Play Trailers',Summery:'Choose if you want that a Stream trailer will autoplay when you open it or not',isActive:false}
],
                  
 Set_Option:(settingname,newvalue)=>set((state)=>({Setting_Options:state.Setting_Options.map((v)=>v.SettingName===settingname ? {...v,isActive:newvalue} : v)})),
}),
{name:'Settings'}))
