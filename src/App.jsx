import { useState,lazy,Suspense } from 'react'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from "react-router-dom"
import {vanData} from "./pages/Vans/Vans.jsx"
import {VanDetailLoader} from "./pages/Vans/VanDetail.jsx"
import {hostVanLoader} from './pages/Host/HostVans.jsx'
import {HostVanDetailLoader} from "./pages/Host/HostVanDetail.jsx"
import { LoginAction } from './pages/Login.jsx'
import { AuthProvider } from './utils/AuthContext.jsx'
import { loader } from './utils/HostLayout.jsx'
import LoadingUI from './utils/LoadingUI.jsx'
import Layout from './utils/Layout'

const Home = lazy(()=> import('./pages/Home.jsx' ))
const About = lazy(()=> import('./pages/About.jsx' ))
const NotFound = lazy(()=> import('./pages/NotFound.jsx' ))
const HostLayout = lazy(()=> import('./utils/HostLayout.jsx' ))
const Login = lazy(()=> import('./pages/Login.jsx' ))
const VanDetail = lazy(()=> import('./pages/Vans/VanDetail.jsx' ))
const Vans  =  lazy(()=> import("./pages/Vans/Vans.jsx"))
const HostVans  =  lazy(()=> import('./pages/Host/HostVans.jsx'))
const HostVanDetail  =  lazy(()=> import('./pages/Host/HostVanDetail.jsx'))
const Income  =  lazy(()=> import('./pages/Host/Income.jsx'))
const Details  =  lazy(()=> import("./pages/Host/VanDetails/Details.jsx"))
const Photos  =  lazy(()=> import("./pages/Host/VanDetails/Photos.jsx"))
const Pricing  =  lazy(()=> import("./pages/Host/VanDetails/Pricing.jsx"))
const Register  =  lazy(()=> import('./pages/Register.jsx'))
const Reviews  =  lazy(()=> import('./pages/Host/Reviews.jsx'))
const Dashboard  =  lazy(()=> import('./pages/Host/Dashboard.jsx'))
const Error  =  lazy(()=> import('./utils/Error.jsx'))



function App() {


  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={ <Layout/>}  errorElement={<Error/>} >
            <Route index element={
             <Suspense fallback={<LoadingUI />}>
               <Home/>
             </Suspense>
              
              } />
            <Route path="about" element={
              <Suspense fallback={<LoadingUI />}>
              <About/>
             </Suspense>
              }/>
            <Route 
            path="vans" 
            element={
              <Suspense fallback={<LoadingUI />}>
               <Vans/>
             </Suspense>
           
          } 
            loader={vanData}
            />
            <Route 
            path='vans/:id' 
            element={
               <Suspense fallback={<LoadingUI />}>
                  <VanDetail/>
             </Suspense>
         
          } 
            loader={VanDetailLoader}
            />
            <Route path='login' element={
              <Suspense fallback={<LoadingUI />}>
                   <Login/>
             </Suspense>
              }  action={LoginAction}/>
            <Route path='register' element={
              <Suspense fallback={<LoadingUI />}>
                   <Register/>
             </Suspense>
             
              }/>
       
            <Route path='host' element={
            
              <Suspense fallback={<LoadingUI />}>
                     <HostLayout/>
             </Suspense>
              } loader={loader}>
            <Route index element={
              
              <Suspense fallback={<LoadingUI />}>
                     <Dashboard/>
             </Suspense>
              }/>
            <Route path="income" element={
              <Suspense fallback={<LoadingUI />}>
                         <Income/>
             </Suspense>
          
              }/>
            <Route path="vans" element={
              <Suspense fallback={<LoadingUI />}>
                                   <HostVans/>
             </Suspense>

            } loader={hostVanLoader} 
            />
            <Route path='vans/:id' element={
                 <Suspense fallback={<LoadingUI />}>
                                       <HostVanDetail/>
             </Suspense>
       
            }
            loader={HostVanDetailLoader} 
          >
            <Route index element={
              <Suspense fallback={<LoadingUI />}>
               <Details/>
             </Suspense>
            }
              />
            <Route path="pricing" element={
               <Suspense fallback={<LoadingUI />}>
                  <Pricing/>
             </Suspense>
           
              }/>
            <Route path="photos" element={
              <Suspense fallback={<LoadingUI />}>
                  <Photos/>
             </Suspense>
           
              }/>
            </Route>
            <Route path="reviews" element={
              <Suspense fallback={<LoadingUI />}>
                           <Reviews/>
             </Suspense>

              }/>
            </Route>
              <Route path='*' element={
                <Suspense fallback={<LoadingUI />}>
                <NotFound/>
             </Suspense>
          
                }/>
          </Route>
  ))

  return (
    <>
      <AuthProvider>
      <RouterProvider router={router}/>
      </AuthProvider>
    </>
  )
}

export default App
