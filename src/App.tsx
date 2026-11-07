
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider}  from "react-router-dom"

import About from "./Main_Componets/About_Componets/About"
import Layout from "./Main_Componets/Layout_Componets/Layout"
import Errors from "./Main_Componets/Error_Componets/Errors"
import Home from "./Main_Componets/Home_Componets/Home"
import Watch_Stream from "./Main_Componets/Watch_Streams_Componets/Watch_Stream"
import Get_New_Item from "./Main_Componets/Watch_Streams_Componets/Get_New_Item"
import Results from "./Main_Componets/Layout_Componets/Search_Componets/Results"


 const Routes=createBrowserRouter(
   createRoutesFromElements(
    <Route path="/" element={<Layout/>} errorElement={<Errors/>}>
      <Route index element={<Home/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Watch/:type/:id" element={<Watch_Stream/>} loader={Get_New_Item}/>
      <Route path="/Search" element={<Results/>} />
    </Route>
   )
 )

 function App() {
 
  return (
    <>
     <RouterProvider router={Routes}/>
    </>
  )
}

export default App
