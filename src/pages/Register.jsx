import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { register } from "../utils/api"
import { motion } from "framer-motion"
import { AuthContext } from "../utils/AuthContext"

export default function Register(){
    const {state} = useLocation()
    const from = state ? state.path : "/host" // Default to /host if no state
    console.log(state,from)
    const[creds,setCreds] = useState({email: "",password: ""})
    const[loading,setLoading] = useState(false)
    const[error,setError] = useState(null)
    const navigate = useNavigate()

    const{user} = useContext(AuthContext)

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    }
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                type: "spring",
                stiffness: 300,
                damping: 24 
            }
        }
    }

    const errorVariants = {
        initial: { opacity: 0, y: -20 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 20
            }
        }
    }

    return  (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
        {!loading ? (
            <motion.div 
                className="login"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {error && (
                    <motion.h2 
                        style={{ color: "red", backgroundColor: "#ffeeee", textAlign: "center" }}
                        variants={errorVariants}
                        initial="initial"
                        animate="animate"
                    >
                        {error}
                    </motion.h2>
                )}
                <motion.h2 variants={itemVariants}>Enter Details</motion.h2>
                <motion.form 
                    onSubmit={handleSubmit}
                    variants={itemVariants}
                >
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <motion.input 
                            type="email" 
                            id="email" 
                            placeholder="Email address"
                            name="email"
                            value={creds.email}
                            onChange={handleClick}
                            whileFocus={{ 
                                scale: 1.02, 
                                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)"
                            }}
                            transition={{ duration: 0.2 }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <motion.input 
                            type="password" 
                            id="password" 
                            placeholder="Password"
                            name="password"
                            value={creds.password}
                            onChange={handleClick}
                            whileFocus={{ 
                                scale: 1.02, 
                                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)"
                            }}
                            transition={{ duration: 0.2 }}
                        />
                    </motion.div>
                    <motion.button
                        whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "#e76f05" 
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        Sign Up
                    </motion.button>
                </motion.form>
                <motion.p 
                    id="signup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    Already have an account? 
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link to="/login" style={{color: "orange", marginLeft: "5px"}}>
                            Login
                        </Link>
                    </motion.span>
                </motion.p>
            </motion.div>
        ) : (
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, -10, 0] }}
                transition={{ 
                    opacity: { duration: 0.3 },
                    y: { repeat: Infinity, duration: 1 }
                }}
            >
                ......Loading
            </motion.h1>
        )}
        </motion.div>
    )

}