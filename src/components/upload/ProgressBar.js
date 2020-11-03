import useStorage from "../../hooks/useStorage"
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { withFirebase } from '../Firebase'

const ProgressBar = ({ file, setFile, firebase }) => {
     const { progress, url } = useStorage(firebase, file)

     useEffect(() => {
         if(url){
            setFile(null)
         }
     }, [url, setFile])

     return (
         <motion.div className="progress-bar" initial={{ width: 0 }} animate={{ width: progress + '%'}}>

         </motion.div>
     )
}

export default withFirebase(ProgressBar)