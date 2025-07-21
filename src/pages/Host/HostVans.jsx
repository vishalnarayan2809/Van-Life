import { getHostVan } from "../../utils/api"
import { useEffect,useState } from "react"
import { Link } from "react-router-dom"
export default function HostVans(){

    const[hostVans,setHostVans] = useState(null)
    useEffect(()=>{
        async function getVans() {
            const vans = await getHostVan()
            setHostVans(vans)
        }
        getVans()
    },[])
    console.log(hostVans)

    return (
        <>
        <h2>Your Listed Vans</h2>
        {
            hostVans ?  hostVans.map(van =>{
                return  <Link key={van.id} to={van.id}>
                <div className="vantile">
                    <img src={van.imageUrl} alt={`An image of ${van.name} van`}></img>
                    <div><h4>{van.name}</h4>
                    <p>{`$${van.price}/day`}</p></div>
                </div></Link>
               }       
        ): <h2>...Loading</h2>
        }
        </>
    )
}