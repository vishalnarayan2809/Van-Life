import Image from "../assets/about_pic.png"
import { useNavigate } from "react-router-dom"
export default function About(){
    const navigate = useNavigate()
    return <div className="about">
            <img src={Image} alt="An image of Van" id="about_van"></img>
                <div id="info">
                     <h2>Don’t squeeze in a sedan when you could relax in a van.</h2>
            <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
            (Hitch costs extra 😉)</p>
            <span>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels</span>
            <div id="destination">
            <h4>Your destination is waiting.<br/>Your van is ready.</h4>
            <button onClick={()=>navigate('/vans')}>Explore our vans</button>
            </div>
                </div>
            </div>
}