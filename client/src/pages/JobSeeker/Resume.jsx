import React from 'react'
import UploadResume from '../../components/UploadResume'

function Resume({selectedUser, getData}) {
  return (
    <div>
      <UploadResume selectedUser={selectedUser} getData={getData}/>
    </div>
  )
}

export default Resume
