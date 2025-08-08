import { getHostVan } from "../../utils/api"
import { useEffect, useState } from "react"
import { Link, useLoaderData } from "react-router-dom"
import { memo, useMemo } from "react"
import { motion } from "framer-motion"

const VanTile = memo(function VanTile({ van }) {
    return (
        <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.8
            }}
        >
            <Link key={van.id} to={van.id}>
                <motion.div 
                    className="vantile"
                    whileHover={{ 
                        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)",
                    }}
                    transition={{ 
                        duration: 0.3,
                        ease: "easeOut" 
                    }}
                >
                    <motion.img 
                        src={van.imageUrl} 
                        alt={`An image of ${van.name} van`} 
                        loading="lazy" 
                        decoding="async"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    ></motion.img>
                    <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        <motion.h4
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {van.name}
                        </motion.h4>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {`$${van.price}/day`}
                        </motion.p>
                    </motion.div>
                </motion.div>
            </Link>
        </motion.div>
    )
});

export const hostVanLoader = async function getVans() {
    const vans = await getHostVan()
    return vans
}

export default function HostVans(){
    const vanData = useLoaderData()
    
    const vanTiles = useMemo(() => {
        if (!vanData) return null;
        
        return vanData.map(van => (
            <VanTile key={van.id} van={van} />
        ));
    }, [vanData]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2,
                duration: 0.5
            }
        }
    }
    
    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="host-vans-container"
        >
            <motion.h2
                variants={headerVariants}
                initial="hidden"
                animate="visible"
            >
                Your Listed Vans
            </motion.h2>
            <motion.div 
                className="host-vans-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {vanData ? (
                    <motion.div
                        className="vans-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {vanTiles}
                    </motion.div>
                ) : (
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        ...Loading
                    </motion.h2>
                )}
            </motion.div>
        </motion.div>
    )
}