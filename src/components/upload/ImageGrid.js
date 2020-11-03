import useDB  from '../../hooks/useDB'
import { motion } from 'framer-motion'
import { withFirebase } from '../Firebase'

const ImageGrid = ({ firebase, setSelectedImage }) => {

    const { docs } = useDB(firebase, 'images')

    return (
        <div className="img-grid">
            { docs && docs.map(doc => (
                <motion.div className="img-wrap" key={doc.key} layout whileHover={{opacity: 1}}s onClick={() => setSelectedImage(doc.url)}>
                    <motion.img src={doc.url} alt="uploaded pic" initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1}}/>
                </motion.div>
            ))
            }
        </div>
    )
}

export default withFirebase(ImageGrid);