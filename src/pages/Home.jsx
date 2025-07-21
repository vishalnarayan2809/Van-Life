import { useNavigate } from "react-router-dom"

export default function Home(){
    const navigate = useNavigate()
    return <div className="home">
        <h2>You got the travel plans, we got the travel vans.</h2>
        <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
        <button onClick={()=>navigate('/vans')}>Find Your Van</button>
    </div>
}