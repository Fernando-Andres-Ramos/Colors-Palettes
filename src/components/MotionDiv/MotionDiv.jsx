import React from 'react'
import { motion} from 'framer-motion';


export default function MotionDiv(props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7}}
      style={{ 
        position: "absolute", 
        width: "100%", 
        height: "100%", 
        top: 0, 
        left: 0 
      }}
    >
      {props.children}
    </motion.div>
  )
}
