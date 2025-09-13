import { easeInOut, motion } from "framer-motion"

export const BouncingLoader = () => {
  return (
    <div className="flex items-center justify-center gap-4">
        {[...Array(4)].map((_,index)=>(
                <motion.div 
                key={index}
                className="w-10 h-10 rounded-full bg-green-500"
                animate={{
                        y:[0,-25,0]
                }}
                transition={{
                        duration:0.8,
                        ease:easeInOut,
                        repeat:Infinity,
                        repeatDelay:index* 0.3,
                }}
                >
                        Loading...
                </motion.div>
        ))}
    </div>
  )
}
