import React, { useState } from 'react'
import { withAuthorization } from '../Session'
import ImageGrid from '../upload/ImageGrid'
import Modal from '../upload/Modal'
import Title from '../upload/Title'
import UploadForm from '../upload/UploadForm'

const Home = () => {

  const [ selectedImage, setSelectedImage ] = useState(null)

    return (
        <div>
          <Title />
          <UploadForm />
          <ImageGrid setSelectedImage={ setSelectedImage }/>
          {selectedImage && (<Modal selectedImage={ selectedImage } setSelectedImage={ setSelectedImage }/>)}
        </div>
    )
}

const condition = authUser => !!authUser 
export default withAuthorization(condition)(Home)
