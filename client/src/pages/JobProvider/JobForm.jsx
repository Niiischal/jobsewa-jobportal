import { Modal } from 'antd'
import React from 'react'

function JobForm(showJobForm, setShowJobForm) {
  return (
    <div>
      <Modal
      title="Add Jobs"
      open={showJobForm}
      onCancel={() => setShowJobForm(false)}
      centered></Modal>
    </div>
  )
}

export default JobForm
