import {getAllVans} from "../../utils/api.js"
import { Link, NavLink,useSearchParams } from "react-router-dom"
import { useEffect ,useState } from "react"
export default function Vans(){
   

   const[vans,setVans] = useState(null)
   const[searchParams,setSearchParams] = useSearchParams()

    const typeFilter = searchParams.get("type")
    console.log(typeFilter)


   useEffect(()=>{    
    async function getVans() {
        const res = await getAllVans()
        setVans(res)
    }
    getVans() 
   },[])

    function setParameter(key,value){
        setSearchParams(prev =>{
             if(value === null){
                    prev.delete(key)
            }else{
                prev.set(key,value)
            }
            return prev
        }
           
        )
    }
    const filteredVans = typeFilter && vans? vans.filter(van => van.type.toLowerCase() === typeFilter):vans
      const vanList = filteredVans ? filteredVans.map(van => {
    return <Link to={`${van.id}`} key={van.id}
            state={typeFilter && {type: typeFilter}}
            >
        <div className="van" >
        <img src={van.imageUrl}></img>
        <div id="name-price"><h3>{van.name}</h3>
        <p>${van.price}/day</p></div>
        <p className={van.type}>{van.type}</p>
    </div>
            </Link>
   }):<h1 className="loading">...Loading</h1>

   console.log(vans)
    return <div className="vans">
        <h2>Explore our van options</h2>
        <div className="filter"> 
            <button  onClick={()=>setParameter("type","simple")}
                className={typeFilter==="simple" ? "vanbtn simple" :"vanbtn"}
                >
                Simple
            </button >
             <button  onClick={()=>setParameter("type","luxury")}
                className={typeFilter==="luxury" ? "vanbtn luxury" :"vanbtn"}
                >
                Luxury
            </button >
             <button onClick={()=>setParameter("type","rugged")}
                className={typeFilter==="rugged" ? "vanbtn rugged" :"vanbtn"}
                >
                Rugged
            </button > 
            <button id="clear"  onClick={()=>setParameter("type",null)}>
            Clear filters
            </button>
    
        </div>
           <div className="van-list">
            {vanList}
        </div>

    </div>
}