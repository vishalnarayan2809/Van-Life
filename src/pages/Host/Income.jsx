import React from "react"
import IncomeGraph from "../../assets/income-graph.png"
import { motion } from "framer-motion"
export default function Income() {
    const transactionsData = [
        { amount: 720, date: "Jan 3, '23", id: "1" },
        { amount: 560, date: "Dec 12, '22", id: "2" },
        { amount: 980, date: "Dec 3, '22", id: "3" },
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
            className="host-income"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 variants={itemVariants}>Income</motion.h1>
            <motion.p variants={itemVariants}>
                Last <span>30 days</span>
            </motion.p>
            <motion.h2 
                variants={itemVariants} 
                className="amount"
                whileHover={{ scale: 1.05 }}
            >
                $2,260
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                    duration: 0.6,
                    delay: 0.3,
                    ease: "easeOut"
                }}
            >
                <motion.img
                    className="graph"
                    src={IncomeGraph}
                    alt="Income graph"
                    whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" 
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                />
            </motion.div>
            <motion.div 
                className="info-header"
                variants={itemVariants}
            >
                <h3>Your transactions (3)</h3>
                <p>
                    Last <span>30 days</span>
                </p>
            </motion.div>
            <motion.div 
                className="transactions"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delayChildren: 0.6, staggerChildren: 0.15 }}
            >
                {transactionsData.map((item) => (
                    <motion.div 
                        key={item.id} 
                        className="transaction"
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.03,
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.08)"
                        }}
                        transition={{ type: "tween" }}
                    >
                        <h3>${item.amount}</h3>
                        <p>{item.date}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    )
}
