import { Button } from 'antd';
import React, { useState } from 'react';
import InterestForm from './InterestForm';

function Interest() {
    const [showInterestForm, setShowInterestForm] = useState(false);
  return (
    <div>
            <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            setShowInterestForm(true);
          }}
        >
          Post Interest
        </Button>
      </div>
      {showInterestForm && (
        <InterestForm
          showInterestForm={showInterestForm}
          setShowInterestForm={setShowInterestForm}
        />
      )}

    </div>
  )
}

export default Interest
