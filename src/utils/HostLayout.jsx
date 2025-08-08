import { Link, Outlet,NavLink,useNavigation ,redirect} from "react-router-dom"
import LoadingUI from "./LoadingUI"
import { auth } from "./api";
import { onAuthStateChanged } from "firebase/auth";
import { requireAuth } from "./AuthContext";



export async function loader({request}) {
    await requireAuth(request)
}


export default function HostLayout(){
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"
    return <>
             <div className="host">
                <nav className="hostnav">
                <NavLink to="." end 
                style={({isActive})=> isActive ? {textDecoration: "underline",fontWeight: "bold"}:null}
                >Dashboard
                </NavLink>
                <NavLink to="income" 
                style={({isActive})=> isActive ? {textDecoration: "underline",fontWeight: "bold"}:null}
                >Income
                </NavLink>
                <NavLink to="vans"
                style={({isActive})=> isActive ? {textDecoration: "underline",fontWeight: "bold"}:null}
                >Vans
                </NavLink>
                <NavLink to="reviews" 
                style={({isActive})=> isActive ? {textDecoration: "underline",fontWeight: "bold"}:null}
                >Reviews
                </NavLink>
             </nav>
           
              {
                 isLoading ?<LoadingUI/>:<div className="hostmain">
                 <Outlet/>
               </div>
              }
          
             </div>
            </>
}