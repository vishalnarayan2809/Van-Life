import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function Home(){
    const navigate = useNavigate()
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.4
            }
        }
    }
    
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }
    }
    
    return (
        <motion.div 
            className="home"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                variants={itemVariants}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: 0.2
                }}
            >
                You got the travel plans, we got the travel vans.
            </motion.h2>
            
            <motion.p
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.
            </motion.p>
            
            <motion.button
                onClick={() => navigate('/vans')}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 300 }}
                whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "#E17654",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.95 }}
            >
                Find Your Van
            </motion.button>
        </motion.div>
    )
}