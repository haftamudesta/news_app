import { easeInOut, motion } from "framer-motion"

const RotatingLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <motion.div className="h-16 w-16 relative border-4 border-t-4 border-teal-400 rounded-full"
        animate={{rotate:360}}
        transition={{duration:0.5,repeat:Infinity,ease:easeInOut}}
        >
                <motion.div className="absolute border-4 inset-0 border-teal-200 rounded-full border-solid"
                animate={{opacity:[1,0.5,1]}}
                transition={{duration:0.5,repeat:Infinity,ease:easeInOut}}
                style={{borderTopColor:'transparent'}}
                >
                </motion.div>
        </motion.div>
    </div>
  )
}

export default RotatingLoader