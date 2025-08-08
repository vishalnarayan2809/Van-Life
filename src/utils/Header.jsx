import { NavLink, Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./api";
import { useAuth } from "./AuthContext"; // Change this import

export default function Header() {
    const { user, loading } = useAuth(); // Use the hook instead of getCurrentUser()
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
            navigate("/"); // Redirect to home after logout
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Show loading state if auth is still loading
    if (loading) {
        return (
            <header>
                <Link to="/" className="logo"><h1>#VANLIFE</h1></Link>
                <nav>Loading...</nav>
            </header>
        );
    }

    return (
        <header>
            <Link to="/" className="logo"><h1>#VANLIFE</h1></Link>
            <nav>
               
                    <NavLink 
                        to="host"
                        style={({isActive}) => isActive ? {textDecoration: "underline"} : null}
                    >
                        Host 
                    </NavLink>
    
                
                <NavLink 
                    to="about"
                    style={({isActive}) => isActive ? {textDecoration: "underline"} : null}
                >
                    About 
                </NavLink>
                
                <NavLink 
                    to="vans"
                    style={({isActive}) => isActive ? {textDecoration: "underline"} : null}
                >
                    Vans
                </NavLink>
                
                {user ? (
                    <button 
                        onClick={handleLogout}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "inherit",
                            textDecoration: "underline",
                            fontSize: "inherit"
                        }}
                    >
                        Logout
                    </button>
                ) : (
                    <NavLink 
                        to="login"
                        style={({isActive}) => isActive ? {textDecoration: "underline"} : null}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.12104 17.8047C7.15267 16.6564 9.4998 16.001 12 16.001C14.5002 16.001 16.8473 16.6564 18.879 17.8047M15 10.001C15 11.6578 13.6569 13.001 12 13.001C10.3431 13.001 9 11.6578 9 10.001C9 8.34412 10.3431 7.00098 12 7.00098C13.6569 7.00098 15 8.34412 15 10.001ZM21 12.001C21 16.9715 16.9706 21.001 12 21.001C7.02944 21.001 3 16.9715 3 12.001C3 7.03041 7.02944 3.00098 12 3.00098C16.9706 3.00098 21 7.03041 21 12.001Z" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </NavLink>
                )}
            </nav>
        </header>
    );
}