import {getAllVans} from "../../utils/api.js"
import { Link, NavLink, useSearchParams, useLoaderData } from "react-router-dom"
import { useCallback, useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"


export const vanData =    async function getVans() {
        const res = await getAllVans()
        return res
    }

export default function Vans(){
   

   const vans = useLoaderData()
   const[searchParams,setSearchParams] = useSearchParams()

    const typeFilter = searchParams.get("type")
    console.log(typeFilter)

  const setParameter= useCallback((key,value)=>{
    setSearchParams(prev =>{
             if(value === null){
                    prev.delete(key)
            }else{
                prev.set(key,value)
            }
            return prev
        }
           
        )
  },[setSearchParams])
  
    const filteredVans = useMemo(()=>{
        return typeFilter && vans? vans.filter(van => van.type.toLowerCase() === typeFilter):vans
    },[typeFilter,vans])

      const vanItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: i * 0.1
      }
    })
  }

  const vanList = filteredVans ? filteredVans.map((van, i) => {
    return (
      <motion.div
        key={van.id}
        custom={i}
        variants={vanItemVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ 
          scale: 1.03, 
          boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
          y: -5
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link to={`${van.id}`} 
          state={typeFilter && {type: typeFilter, van: van}}
        >
          <div className="van">
            <motion.img 
              src={van.imageUrl} 
              loading="lazy" 
              decoding="async"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div id="name-price">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + (i * 0.05) }}
              >
                {van.name}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + (i * 0.05) }}
              >
                ${van.price}/day
              </motion.p>
            </motion.div>
            <motion.p 
              className={van.type}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.4 + (i * 0.05),
                type: "spring",
                stiffness: 500
              }}
            >
              {van.type}
            </motion.p>
          </div>
        </Link>
      </motion.div>
    )
  }) : (
    <motion.h1 
      className="loading"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.5, 1, 0.5],
        y: [0, -10, 0]
      }}
      transition={{ 
        repeat: Infinity,
        duration: 1.5
      }}
    >
      ...Loading
    </motion.h1>
  )

   console.log(vans)
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
    
    const filterButtonVariants = {
        hover: (filterType) => ({
            scale: 1.05,
            y: -2,
            boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
            backgroundColor: 
                filterType === "simple" ? "#E17654" : 
                filterType === "luxury" ? "#161616" : 
                filterType === "rugged" ? "#115E59" : "#FFEAD0"
        }),
        tap: { scale: 0.95 }
    }
    
    return (
        <motion.div 
            className="vans"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: 0.1
                }}
            >
                Explore our van options
            </motion.h2>
            
            <motion.div 
                className="filter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    delay: 0.3,
                    duration: 0.6
                }}
            > 
                <AnimatePresence>
                    <motion.button  
                        onClick={() => setParameter("type", "simple")}
                        className={typeFilter === "simple" ? "vanbtn simple" : "vanbtn"}
                        custom="simple"
                        whileHover="hover"
                        whileTap="tap"
                        variants={filterButtonVariants}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        Simple
                    </motion.button>
                    
                    <motion.button  
                        onClick={() => setParameter("type", "luxury")}
                        className={typeFilter === "luxury" ? "vanbtn luxury" : "vanbtn"}
                        custom="luxury"
                        whileHover="hover"
                        whileTap="tap"
                        variants={filterButtonVariants}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        Luxury
                    </motion.button>
                    
                    <motion.button 
                        onClick={() => setParameter("type", "rugged")}
                        className={typeFilter === "rugged" ? "vanbtn rugged" : "vanbtn"}
                        custom="rugged"
                        whileHover="hover"
                        whileTap="tap"
                        variants={filterButtonVariants}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        Rugged
                    </motion.button>
                    
                    <motion.button 
                        id="clear"  
                        onClick={() => setParameter("type", null)}
                        whileHover={{ 
                            scale: 1.05,
                            textDecoration: "underline"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Clear filters
                    </motion.button>
                </AnimatePresence>
            </motion.div>
            
            <motion.div 
                className="van-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                layout
            >
                <AnimatePresence>
                    {vanList}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}