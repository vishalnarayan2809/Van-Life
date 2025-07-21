import { useState, useContext,useEffect } from "react"; // Remove useEffect
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../utils/api";
import { AuthContextInternal } from "../utils/AuthContext";

export default function Login() {
    const { state } = useLocation();
    const from = state ? state.path : "/host";
    let text = state && state.text;
    const [creds, setCreds] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const { user } = useContext(AuthContextInternal);

    function handleClick(e) {
        const name = e.target.name;
        const value = e.target.value;
        setCreds(prev => ({
            ...prev,
            [name]: value
        }));
    }


  useEffect(() => {
    if (user && !loading && !error) {
      navigate(from, { replace: true })
    }
  }, [user, loading, error])
  
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {

           await login(creds);
           setCreds({email: "", password: ""})
            
        } catch (error) {
            console.error("Login error:", error);
            const errorMessage = error.code
                ? `Authentication failed: ${error.code.replace('auth/', '')}`
                : error.message || "Login failed";
            setError(errorMessage);
            setCreds({email: "", password: ""})
           
        } finally {
            setLoading(false);
            setCreds({email: "", password: ""})
        }
    }

    return (
        <>
           
            {!loading ? (
                <div className="login">
                     {error && <h2 style={{ color: "red", backgroundColor: "#ffeeee",textAlign: "center" }}>{error}</h2>}
                    {text > 1  && <h2 style={{ color: "red" }}>{text}</h2>}
                    <h3>Sign in to your account</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email address"
                            name="email"
                            value={creds.email}
                            onChange={handleClick}
                        />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            name="password"
                            value={creds.password}
                            onChange={handleClick}
                        />
                        <button disabled={loading}>Sign In</button>
                    </form>
                    <p id="signup">Don’t have an account? <Link to="/register" style={{ color: "orange" }}>Create one now</Link></p>
                </div>
            ) : (
                <h1>......Loading</h1>
            )}
        </>
    );
}