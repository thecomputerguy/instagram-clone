import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const useStorage = (firebase, file) => {
    const [progress, setProgress] = useState(0)
    const [url, setUrl] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const storageRef = firebase.storage.ref(file.name)
        const uuid = uuidv4()
        const dbRef = firebase.db.ref(`images/${uuid}`)
        storageRef.put(file).on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
            setProgress(progress)
        }, (error) => {
            setError(error)
        }, async () => {
            const url = await storageRef.getDownloadURL()
            const createdAt = new Date()
            //Store metadata to collection
            await dbRef.set({
                url,
                createdAt,
            })

            setUrl(url)
        })
        
    }, [file, firebase.db, firebase.storage])
 
    return { progress, url, error }
}

export default useStorage