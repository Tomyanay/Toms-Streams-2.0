import { useState } from "react"

import { Headers } from "./About_data"

import type { head } from "./About_types"

import { motion } from "framer-motion"

import SettingsButton from './assets/SettingsImages/Settings.png'
import SettingComponet from './assets/SettingsImages/Settings_Componet.png'
import WatchItem from './assets/WatchImages/WatchItem.png'
import Friends_Grid from './assets/WatchImages/Friends_Grid.png'
import VenomSearch from './assets/SearchImages/VenomSearch.png'
import MostPopular from './assets/HomeImgaes/MostPopular.png'
import Watched from './assets/HomeImgaes/Watched.png'
import All_Items from './assets/HomeImgaes/All_Items.png'

function About() {

  const [Links,setLinks]=useState<head[]>(Headers)


  function ChooseItem(name: string) {setLinks(sl => sl.map((v) => v.name===name ? {...v, isActive:true} : {...v,isActive:false}))}

  return (
    <div className="Inner_Section_Background relative grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-8 ">
      <aside className="border-r-3 Border_Color pr-2 md:col-span-1 hidden md:block">
        <div className="sticky top-6 mx-2 pr-2">
          <h2 className="text-xl xl:text-2xl uppercase Title_color tracking-wider font-bold my-2.5 pl-4 ">Navigation</h2>
          {Links.map((v,i) => (
            <motion.a 
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              onClick={()=>ChooseItem(v.name)}
              key={i}
              href={v.link}
              className={`${v.isActive ? 'accent_Color' : 'Red_Text_Color'} hover:bg-secondary/60 font-semibold 
              mx-1 xl:ml-3.5 pl-1 py-2.5 rounded-lg text-xl xl:text-2xl my-1.5 flex items-center cursor-pointer `}>
              <v.icon className="text-xl xl:text-2xl mr-1.5" />
              <span className="truncate">{v.name}</span> 
            </motion.a>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="col-span-1 md:col-span-3 xl:col-span-4 3xl:col-span-7 my-4">
        
        {/* Streams Section */}
        <motion.section 
          initial={{opacity:0,y:20}} 
          animate={{opacity:1,y:0}} 
          transition={{duration: 1}}
          id="Streams" 
          className="border-2 Border_Color p-6 rounded-lg mx-4 my-5 Border_Hover "
        >
          <h1 className="text-2xl xl:text-3xl font-extrabold Title_color mb-3">Tom's Streams</h1>
          <p className="Secondary_Text_Color text-base xl:text-lg leading-relaxed">
            Welcome to <span className="Title_color font-bold">Tom's Streams</span>, a modern streaming website. I created this website in order to help other people 
            to watch their favorite media for free. There are many options that the user can select and use in order to improve their experience.<br /><br />
            I made this guide to help you to maximize your enjoyment of this website and explain each section in detail for ease of access.<br />
            If you want to navigate to a certain part of the explanation, you can use the links on the left to choose the part that you want to know about.
          </p>
        </motion.section>

        {/* Home Section */}
        <motion.section
          initial={{opacity:0,y:20}} 
          whileInView={{opacity:1,y:0}} 
          viewport={{once:true}}
          transition={{duration:1.5}}
          id="Home" 
          className="border-2 Border_Color p-5 rounded-lg mx-4 my-5 Border_Hover">
          <h1 className="text-2xl xl:text-3xl font-extrabold Title_color mb-3">Home</h1>
          <p className="Secondary_Text_Color text-base xl:text-lg leading-relaxed">
            Welcome to the main page of this website. Here you can find many features such as the following:
          </p>

          <div className="mt-5">
            <span className="font-semibold text-lg xl:text-xl">Top 20 most popular items of Current year</span>
            <div className="my-5">
              <img className="select-none w-full border-3 border-movie-red dark:border-light-movie-red rounded-lg " draggable={false} src={MostPopular} alt="Most popular Home" />
            </div>
            <p className="Secondary_Text_Color text-base xl:text-lg leading-relaxed">
              The user can see the top 20 most popular movies in current day, which auto-updates when refreshing the site.
            </p>
          </div>

          <div className="mt-8">
            <span className="font-semibold text-lg xl:text-xl">The items that you watched in recent times</span>
            <div className="my-5">
              <img className="select-none w-full border-3 border-movie-red dark:border-light-movie-red rounded-lg" draggable={false} src={Watched} alt="Watched items" />
            </div>
            <p className="Secondary_Text_Color text-base xl:text-lg leading-relaxed">
              You can hide this menu using the settings and filter your items to: All types, Movies only, and TV Shows only.<br/>
              <span className="font-semibold text-movie-purple dark:text-light-movie-purple block mt-2">
                (Very important!! You can only have up to 50 watched items. If you try to add any beyond that, your oldest item shall be removed in order to make space for the new one.)
            </span>
            </p>
          </div>

          <div className="mt-8">
            <span className="font-semibold text-lg xl:text-xl">All of the items of said year and more</span>
            <div className="my-5">
              <img className="select-none w-full border-3 border-movie-red dark:border-light-movie-red rounded-lg" draggable={false} src={All_Items} alt="All items" />
            </div>
            <p className="Secondary_Text_Color text-base xl:text-lg leading-relaxed">
              As you can see, we have 3 tabs. The first 2 are for either movies or TV Shows. 
              Each page contains a maximum of 20 for the chosen year. You can also change the item's year, genre, and preferred order.<br/><br/>
              The third one, called "Liked Items," contains all of the items that you liked (items that the user pressed the heart icon on). They will be shown to you in the order of 
              selection. Like the previous two, it also contains a maximum of 20 items per page. When you unlike an item, it will automatically disappear from your "Liked Items" cards.
            </p>
          </div>
        </motion.section>

        {/* Search Section */}
        <motion.section 
          initial={{opacity:0,y:20}} 
          whileInView={{opacity:1,y:0}} 
          viewport={{once: true}}
          transition={{duration:1.5}}
          id="Search" 
          className="border-2 Border_Color p-6 rounded-lg mx-4 my-5 Border_Hover">  
          <h1 className="text-2xl xl:text-3xl font-extrabold Title_color mb-3">Search</h1>
          <p className="Secondary_Text_Color text-base xl:text-lg leading-relaxed">
            You can search for any item you want using the search entry in the middle of our header (the one with the Magnifying Glass icon).<br/>
            In our case, we chose to search for the movie <span className="italic">"Venom"</span>, as you can see in the following image:
          </p>
          <div className="my-5">
            <img className="select-none w-full border-3 border-movie-red dark:border-light-movie-red rounded-lg" draggable={false} src={VenomSearch} alt="Search venom" />
          </div>  
          <p className="Secondary_Text_Color text-base xl:text-lg leading-relaxed">
            We can see that we have the exact number of results for our search term, and we can filter the results to movies, TV Shows, or both. 
            Then you can click on anything you want in order to watch the item.
          </p>
        </motion.section>

        {/* Settings Section */}
        <motion.section 
          initial={{opacity:0,y:20}} 
          whileInView={{opacity:1,y:0}} 
          viewport={{once:true}}
          transition={{duration:1.5}}
          id="Settings" 
          className="border-2 Border_Color p-6 rounded-lg mx-4 my-5 Border_Hover"
        >
          <h1 className="text-2xl xl:text-3xl font-extrabold Title_color mb-3">Settings</h1>
          <p className="Secondary_Text_Color text-base xl:text-lg leading-relaxed">
            The Settings tab is used to enable helpful options based on user preference. 
            None of the settings are required in order to enjoy the website, and all chosen settings will be saved so you don't have to reselect them.<br/><br/>
          </p>

          <h3 className="font-semibold text-primary dark:text-light-primary text-lg xl:text-xl mb-2">How to open the settings tab:</h3>
          <p className="Secondary_Text_Color text-base mb-2">Press the Settings button in the rightmost area of the layout as seen in the image</p>
          <div className="my-5 flex justify-center">
            <img className="select-none  border-3 border-movie-red dark:border-light-movie-red rounded-lg" draggable={false} src={SettingsButton} alt="Settings button image" />
          </div>

          <p className="Secondary_Text_Color text-base xl:text-lg mb-2">Then you will see the following panel:</p>
          <div className="my-5 flex justify-center">
            <img className="select-none  border-3 border-movie-red dark:border-light-movie-red rounded-lg" draggable={false} src={SettingComponet} alt="Settings frame image" />
          </div>  

          <div className="mt-4 text-base xl:text-lg Secondary_Text_Color ">
            <p className="my-3"><span className="font-semibold text-lg xl:text-xl text-primary dark:text-light-primary">Light Mode:</span> Changes the website's look to a lighter feel.</p>
            <p className="my-3"><span className="font-semibold text-lg xl:text-xl text-primary dark:text-light-primary">Episode View Style:</span> Changes how TV show episodes are displayed (listed or gridded).</p>
            <p className="my-3"><span className="font-semibold text-lg xl:text-xl text-primary dark:text-light-primary">Adult Mode:</span> Removes PG restrictions and gives you access to PG-13+ content.</p>
            <p className="my-3"><span className="font-semibold text-lg xl:text-xl text-primary dark:text-light-primary">Hide Watched Items:</span> Hides the watched items section in the Home tab.</p>
            <p className="my-3"><span className="font-semibold text-lg xl:text-xl text-primary dark:text-light-primary">Confirm Message:</span> Displays a popup confirmation message whenever you are about to unlike an item.</p>
            <p className="my-3"><span className="font-semibold text-lg xl:text-xl text-primary dark:text-light-primary">Spoiler-Free Mode:</span> Hides movie/show descriptions and TV episode's highlight image.</p>
            <p className="my-3"><span className="font-semibold text-lg xl:text-xl text-primary dark:text-light-primary">Show Indicators:</span> Displays a green checkmark on any item you have viewed before.</p>
            <p className="my-3"><span className="font-semibold text-lg xl:text-xl text-primary dark:text-light-primary">Auto-Play Trailers:</span> Automatically plays the trailer when entering the watch options.</p>
          </div>

          <p className="Secondary_Text_Color text-base xl:text-lg leading-relaxed">
            Click on the red arrow in order to quit the settings page.
          </p>
        </motion.section>

        {/* Watch Menu Section */}
        <motion.section 
          initial={{opacity:0,y:20}} 
          whileInView={{opacity:1, y:0}} 
          viewport={{once: true}}
          transition={{duration:1.5}}
          id="Watch Menu" 
          className="border-2 Border_Color p-6 rounded-lg mx-4 my-5 Border_Hover"
        >
          <h1 className="text-2xl xl:text-3xl font-extrabold Title_color mb-3">Watch Menu</h1>
          <p className="Secondary_Text_Color text-base xl:text-lg leading-relaxed">
            The watch menu is where you get to watch your item of choice by clicking on one of the item cards (we chose <span className="italic">Spider-Man: Brand New Day</span>).<br/>
            <span className="font-semibold text-movie-purple dark:text-light-movie-purple block mt-2">(Very important: Make sure you enable the Adult Mode setting in the settings page if you want to watch non-PG content!)</span><br/>
            After clicking, you will see the following page:
          </p>
             
          <div className="my-5">
            <img className="select-none w-full border-3 border-movie-red dark:border-light-movie-red rounded-lg" draggable={false} src={WatchItem} alt="Watch frame part 1" />
          </div>  
          
          <p className="Secondary_Text_Color text-base xl:text-lg leading-relaxed my-5">
            Here we can see the trailer for the movie and some information about it. Below that, you can either watch the full movie or choose an episode to watch 
            (you can configure your preferred episode layout in the settings). For example, I chose the grid layout for the TV show <span className="italic">Friends</span>, 
            as seen in the following image:
          </p>
          
          <div className="my-5">
            <img className="select-none w-full border-3 border-movie-red dark:border-light-movie-red rounded-lg" draggable={false} src={Friends_Grid} alt="Watch frame part 2" />
          </div>  
          
          <p className="Secondary_Text_Color text-base xl:text-lg leading-relaxed">
            You can choose the season using the dropdown menu at the top, and select an episode by clicking on it.
          </p>
        </motion.section>

      </main>
    </div>
  )
}

export default About