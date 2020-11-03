import { useState, useEffect } from "react"

const useDB = (firebase, collection) => {
    const [ docs, setDocs ] = useState([])

    useEffect(() => {
        const collectionRef = firebase.db.ref(collection)
        
        //orderBy('createdAt', 'desc') Add it later
        collectionRef.on('value', (snapshot) => {
            const imagesMetadataObject = snapshot.val()
            if (imagesMetadataObject) {
                const imagesMetadataList = Object.keys(imagesMetadataObject).map(key => ({key, ...imagesMetadataObject[key]}))
                setDocs(imagesMetadataList)
            }
        })
        return () => {
            collectionRef.off()
        }
    }, [collection, firebase.db])

    return { docs }
}

export default useDB