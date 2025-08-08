import React from "react"
import { BsStarFill } from "react-icons/bs"
import ReviewGraph from "../../assets/reviews-graph.png"
import { motion } from "framer-motion"

export default function Reviews() {
    const reviewsData = [
        {
            rating: 5,
            name: "Elliot",
            date: "January 3, 2023",
            text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
            id: "1",
        },
        {
            rating: 5,
            name: "Sandy",
            date: "December 12, 2022",
            text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
            id: "2",
        },
    ]
    
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
            transition: { duration: 0.5 }
        }
    }

    return (
        <motion.section 
            className="host-reviews"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div 
                className="top-text"
                variants={itemVariants}
            >
                <h2>Your reviews</h2>
                <p>
                    Last <span>30 days</span>
                </p>
            </motion.div>
            <motion.img
                className="graph"
                src={ReviewGraph}
                alt="Review graph"
                variants={itemVariants}
                whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" 
                }}
                transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.h3 variants={itemVariants}>Reviews (2)</motion.h3>
            {reviewsData.map((review) => (
                <motion.div 
                    key={review.id}
                    variants={itemVariants}
                    whileHover={{ 
                        scale: 1.01,
                        backgroundColor: "rgba(255, 255, 255, 0.5)"
                    }}
                >
                    <motion.div 
                        className="review"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {[...Array(review.rating)].map((_, i) => (
                            <motion.div 
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ 
                                    delay: 0.3 + (i * 0.1),
                                    type: "spring",
                                    stiffness: 300
                                }}
                            >
                                <BsStarFill className="review-star" />
                            </motion.div>
                        ))}
                        <motion.div 
                            className="info"
                            variants={itemVariants}
                        >
                            <p className="name">{review.name}</p>
                            <p className="date">{review.date}</p>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {review.text}
                        </motion.p>
                    </motion.div>
                    <motion.hr 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8 }}
                    />
                </motion.div>
            ))}
        </motion.section>
    )
}
