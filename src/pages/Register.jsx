import { useState,useEffect,useContext } from "react"
import {useNavigate , useLocation, Link} from "react-router-dom"
import { register } from "../utils/api"
import {AuthContextInternal} from "../utils/AuthContext"

export default function Register(){
    const {state} = useLocation()
    const from = state ? state.path : "/host" // Default to /host if no state
    console.log(state,from)
    const[creds,setCreds] = useState({email: "",password: ""})
    const[loading,setLoading] = useState(false)
    const[error,setError] = useState(null)
    const navigate = useNavigate()

    const{user} = useContext(AuthContextInternal)

    function handleClick(e){
        const name = e.target.name
        const value = e.target.value
        setCreds(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

      useEffect(() => {
    if (user && !loading && !error) {
      navigate(from, { replace: true })
    }
  }, [user, loading, error])

async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
        await register(creds)
        setCreds({email: "",password: ""})
    
    } catch (error) {
    console.error("Login error:", error);
    const errorMessage = error.code ? 
        `Authentication failed: ${error.code.replace('auth/', '')}` : 
        error.message || "Login failed";
    setError(errorMessage);
    setCreds({email: "",password: ""})
    setLoading(false);
} 
}

    return  (
        <>

      {!loading ?<div className="login">
                 {error && <h2 style={{ color: "red", backgroundColor: "#ffeeee",textAlign: "center" }}>{error}</h2>}
        <h2>Enter Details</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" id="email" placeholder="Email addreess"
            name="email"
            value={creds.email}
            onChange={handleClick}
            >
            </input>
            <input type="password" id="password" placeholder="Password"
            name="password"
            value={creds.password}
            onChange={handleClick}
            >
            </input>   
            <button>Sign Up</button>
        </form>
        <p id="signup">Already have an account? <Link to="/login" style={{color: "orange"}}>Login</Link></p>
    </div> :<h1>......Loading</h1>}
        </>
    )

}