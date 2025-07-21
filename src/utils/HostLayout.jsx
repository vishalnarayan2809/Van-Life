import { Link, Outlet,NavLink } from "react-router-dom"

export default function HostLayout(){
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
           
               <div className="hostmain">
                 <Outlet/>
               </div>
          
             </div>
            </>
}