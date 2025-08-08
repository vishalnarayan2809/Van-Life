import { useParams, Link, useLocation, useLoaderData } from "react-router-dom"
import { getVan } from "../../utils/api"
import { motion } from "framer-motion"


export async function VanDetailLoader({params}){
    return getVan(params.id)
}

export default function VanDetail(){
    const van = useLoaderData()
    const {state} = useLocation()
    const type = state && state.type 

        if (!van) {
        return null; // or a minimal placeholder
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

    const backLinkVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0, 
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    }

    return (
        <motion.div 
            className="van-detail"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                variants={backLinkVariants}
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
            >
                <Link to={type ? `..?type=${type}` : ".."} relative="path">
                    <span id="back">
                        <svg width="13" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "1rem"}}>
                            <path d="M13.0223 6.28131C13.4036 6.28131 13.7128 5.97217 13.7128 5.59082C13.7128 5.20947 13.4036 4.90033 13.0223 4.90033V6.28131ZM0.574363 5.10257C0.304709 5.37222 0.304709 5.80942 0.574363 6.07907L4.96862 10.4733C5.23828 10.743 5.67547 10.743 5.94513 10.4733C6.21478 10.2037 6.21478 9.76648 5.94513 9.49683L2.03912 5.59082L5.94513 1.68481C6.21478 1.41516 6.21478 0.977962 5.94513 0.708308C5.67547 0.438654 5.23828 0.438654 4.96862 0.708308L0.574363 5.10257ZM13.0223 4.90033L1.06261 4.90033V6.28131L13.0223 6.28131V4.90033Z" fill="#858585"/>
                        </svg>
                        Back to all vans
                    </span>
                </Link>
            </motion.div>
            
            <motion.img 
                src={van.imageUrl} 
                alt="van image" 
                loading="lazy" 
                decoding="async"
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)" 
                }}
            />
            
            <motion.p 
                className={van.type}
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                    delay: 0.4,
                    type: "spring",
                    stiffness: 500,
                    damping: 10
                }}
            >
                {van.type}
            </motion.p>
            
            <motion.h3
                variants={itemVariants}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                {van.name}
            </motion.h3>
            
            <motion.span
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <motion.p 
                    id="price"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                        delay: 0.7,
                        type: "spring", 
                        stiffness: 300
                    }}
                >
                    ${van.price}
                </motion.p>/day
            </motion.span>
            
            <motion.p 
                id="desc"
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
            >
                {van.description}
            </motion.p>
            
            <motion.button
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    delay: 0.9,
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                }}
                whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "#E17654",
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" 
                }}
                whileTap={{ scale: 0.95 }}
            >
                Rent This Van
            </motion.button>
        </motion.div>
    )
}