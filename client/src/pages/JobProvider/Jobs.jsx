import { Button } from "antd";
import React, { useState } from "react";
import JobForm from "./JobForm";

function Jobs() {
  const [showJobForm, setShowJobForm] = useState(false);

  return (
    <div className="flex justify-end">
      <Button
        type="primary"
        onClick={() => setShowJobForm(true)}
      >
        Add Jobs
      </Button>
      {showJobForm && <JobForm showJobForm={showJobForm} setShowJobForm={setShowJobForm} />}
    </div>
  );
}

export default Jobs;
