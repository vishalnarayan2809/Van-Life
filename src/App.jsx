import { useState } from 'react'
import {Route ,Routes,BrowserRouter} from "react-router-dom"
import Home from './pages/Home' 
import Layout  from './utils/Layout'
import About from  "./pages/About.jsx"
import Vans from "./pages/Vans/Vans.jsx"
import VanDetail from "./pages/Vans/VanDetail.jsx"
import NotFound from "./pages/NotFound.jsx"
import HostLayout from "./utils/HostLayout.jsx"
import Dashboard from './pages/Host/Dashboard.jsx'
import HostVans from './pages/Host/HostVans.jsx'
import Income from './pages/Host/Income.jsx'
import Reviews from './pages/Host/Reviews.jsx'
import HostVanDetail from "./pages/Host/HostVanDetail.jsx"
import Details from "./pages/Host/VanDetails/Details.jsx"
import Photos from "./pages/Host/VanDetails/Photos.jsx"
import Pricing from "./pages/Host/VanDetails/Pricing.jsx"
import Login from './pages/Login.jsx'
import Register  from './pages/Register.jsx'
import Authenticated from './utils/Authenticated.jsx'
import AuthContext from './utils/AuthContext.jsx'
function App() {


  return (
    <>
    <AuthContext>
    <BrowserRouter>
        <Routes>
          <Route element={ <Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="vans" element={<Vans/>}/>
            <Route path='vans/:id' element={<VanDetail/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route element={<Authenticated/>}>
            <Route path='host' element={<HostLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="income" element={<Income/>}/>
            <Route path="vans" element={<HostVans/>}/>
            <Route path='vans/:id' element={<HostVanDetail/>}>
            <Route index element={<Details/>}/>
            <Route path="pricing" element={<Pricing/>}/>
            <Route path="photos" element={<Photos/>}/>
            </Route>
            <Route path="reviews" element={<Reviews/>}/>
            </Route>
            </Route>
              <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
      </AuthContext>
    </>
  )
}

export default App
