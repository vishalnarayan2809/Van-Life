import React from "react"
import { Link } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { getHostVan } from "../../utils/api"
import { motion } from "framer-motion"

export default function Dashboard() {
    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    React.useEffect(() => {
        setLoading(true)
        getHostVan()
            .then(data => setVans(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.4,
                when: "beforeChildren",
                staggerChildren: 0.15
            }
        }
    }
    
    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
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

    function renderVanElements(vans) {
        const hostVansEls = vans.map((van, index) => (
            <motion.div 
                className="vantile" 
                key={van.id}
                variants={itemVariants}
                whileHover={{ 
                    scale: 1.04, 
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <motion.img 
                    src={van.imageUrl} 
                    alt={`Photo of ${van.name}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                />
                <motion.div className="host-van-info">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + (index * 0.1) }}
                    >
                        {van.name}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                        ${van.price}/day
                    </motion.p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link to={`vans/${van.id}`}>View</Link>
                </motion.div>
            </motion.div>
        ))

        return (
            <motion.div 
                className="host-vans-list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <section>{hostVansEls}</section>
            </motion.div>
        )
    }

    // if (loading) {
    //     return <h1>Loading...</h1>
    // }

    if (error) {
        return <h1>Error: {error.message}</h1>
    }

    const dashboardVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }
    
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                duration: 0.6,
                bounce: 0.3
            }
        }
    }

    return (
        <motion.div
            variants={dashboardVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.section 
                className="host-dashboard-earnings"
                variants={sectionVariants}
                whileHover={{ 
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.08)",
                    y: -4
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <motion.div className="info">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Welcome!
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Income last <span>30 days</span>
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                            delay: 0.5, 
                            type: "spring",
                            stiffness: 300
                        }}
                    >
                        $2,260
                    </motion.h2>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to="income">Details</Link>
                </motion.div>
            </motion.section>
            
            <motion.section 
                className="host-dashboard-reviews"
                variants={sectionVariants}
                whileHover={{ 
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.08)",
                    y: -4
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Review score
                </motion.h2>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                        delay: 0.6,
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                    }}
                >
                    <BsStarFill className="star" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <motion.span
                        initial={{ fontWeight: "normal" }}
                        animate={{ fontWeight: "bold" }}
                        transition={{ delay: 1, duration: 0.3 }}
                    >
                        5.0
                    </motion.span>/5
                </motion.p>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to="reviews">Details</Link>
                </motion.div>
            </motion.section>
            
            <motion.section 
                className="host-dashboard-vans"
                variants={sectionVariants}
            >
                <motion.div 
                    className="top"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2>Your listed vans</h2>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="vans">View all</Link>
                    </motion.div>
                </motion.div>
                {
                    loading && !vans
                    ? <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        Loading...
                      </motion.h1>
                    : (
                        <>
                            {renderVanElements(vans)}
                        </>
                    )
                }
                {/*<React.Suspense fallback={<h3>Loading...</h3>}>
                    <Await resolve={loaderData.vans}>{renderVanElements}</Await>
                </React.Suspense>*/}
            </motion.section>
        </motion.div>
    )
}
