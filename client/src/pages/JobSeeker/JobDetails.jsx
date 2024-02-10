import React from 'react'

function JobDetails(props) {
  const { selectedJob } = props.location.state;
  return (
          <div className="w-full p-4 bg-white">
      <div>
        <h1>{`Content for ${selectedJob.category}`}</h1>
        <p>{`Company: ${selectedJob.companyname}`}</p>
        <p>{`Location: ${selectedJob.companylocation}`}</p>
        {/* Render additional details or components related to the selected job */}
      </div>
    </div>
  )
}


export default JobDetails;
