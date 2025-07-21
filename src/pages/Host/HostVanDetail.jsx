import { useParams ,NavLink,Outlet, Link} from "react-router-dom"
import { getVan } from "../../utils/api"
import { useState,useEffect } from "react"
export default function HostVanDetail(){
    const[vanDetail,setVanDetail] = useState(null)
      const {id} = useParams()
    useEffect(()=>{
        async function getRes() {
            const vans = await getVan(id)
            setVanDetail(vans)
        }
        getRes()
    },[])


    return(
            <>
            <Link to=".." relative="path" >
              <span id="back"><svg width="13" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "1rem"}}> 
    <path d="M13.0223 6.28131C13.4036 6.28131 13.7128 5.97217 13.7128 5.59082C13.7128 5.20947 13.4036 4.90033 13.0223 4.90033V6.28131ZM0.574363 5.10257C0.304709 5.37222 0.304709 5.80942 0.574363 6.07907L4.96862 10.4733C5.23828 10.743 5.67547 10.743 5.94513 10.4733C6.21478 10.2037 6.21478 9.76648 5.94513 9.49683L2.03912 5.59082L5.94513 1.68481C6.21478 1.41516 6.21478 0.977962 5.94513 0.708308C5.67547 0.438654 5.23828 0.438654 4.96862 0.708308L0.574363 5.10257ZM13.0223 4.90033L1.06261 4.90033V6.28131L13.0223 6.28131V4.90033Z" fill="#858585"/>
            </svg>Back to all Vans</span></Link>
            {
            
            vanDetail ? 
            <>
            <div className="hostvandetail">
        <div>
            <img src={vanDetail.imageUrl} alt={`An image of ${vanDetail.name} van`}></img>
            <div className="hostvaninfo">
            <p className={vanDetail.type}>{vanDetail.type}</p>
            <h2>{vanDetail.name}</h2>
            <p>{`$${vanDetail.price}/day`}</p>
        </div>
        </div>
           <nav>
         <NavLink to="." end
         style={({isActive})=> isActive ? {textDecoration: "underline",fontWeight: "bold"}:null}
         >
            Details
         </NavLink>
          <NavLink to="pricing" 

         style={({isActive})=> isActive ? {textDecoration: "underline",fontWeight: "bold"}:null}
         >
            Pricing
         </NavLink>
          <NavLink to="photos" 
         style={({isActive})=> isActive ? {textDecoration: "underline",fontWeight: "bold"}:null}
         >
            Photos
         </NavLink>

        </nav>
        <Outlet context={{vanObj: vanDetail}}/>
        </div>

        </>
        :<h1>...Loading</h1>}
            </>
       
    )
}