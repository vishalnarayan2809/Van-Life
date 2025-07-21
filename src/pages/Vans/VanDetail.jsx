import { useParams ,Link,useLocation} from "react-router-dom"
import { getVan } from "../../utils/api"
import { useEffect,useState } from "react"

export default function VanDetail(){
    const[van,setVan] = useState(null)
    const {state} = useLocation()
    const type = state && state.type 

    const {id} = useParams()
     useEffect(()=>{
        async function getVanRes(){
            const res = await getVan(id)
            res && setVan(res)
        }
        getVanRes()
     },[id])
    return (
   van ? <div className="van-detail">
    <Link to={type ?`..?type=${type}`:".."} relative="path" >
    <span id="back"><svg width="13" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "1rem"}}>
    <path d="M13.0223 6.28131C13.4036 6.28131 13.7128 5.97217 13.7128 5.59082C13.7128 5.20947 13.4036 4.90033 13.0223 4.90033V6.28131ZM0.574363 5.10257C0.304709 5.37222 0.304709 5.80942 0.574363 6.07907L4.96862 10.4733C5.23828 10.743 5.67547 10.743 5.94513 10.4733C6.21478 10.2037 6.21478 9.76648 5.94513 9.49683L2.03912 5.59082L5.94513 1.68481C6.21478 1.41516 6.21478 0.977962 5.94513 0.708308C5.67547 0.438654 5.23828 0.438654 4.96862 0.708308L0.574363 5.10257ZM13.0223 4.90033L1.06261 4.90033V6.28131L13.0223 6.28131V4.90033Z" fill="#858585"/>
    </svg>
    </span>Back to all vans</Link> 
    <img src={van.imageUrl} alt="van image"></img>
     <p className={van.type}>{van.type}</p>
     <h3>{van.name}</h3>
     <span><p id="price">${van.price}</p>/day</span>
     <p id="desc">{van.description}</p>
     <button>Rent This Van</button>
    </div>:<h1 className="loading">......Loading</h1>
    
)

}