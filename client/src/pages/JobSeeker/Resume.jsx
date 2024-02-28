import { Tabs } from 'antd'
import React from 'react'
import UploadResume from '../../components/UploadResume'

function Resume() {
  return (
    <div className="pl-[1rem] pr-[1rem]">
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Upload Resume" key="1">
        <UploadResume/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Generate Resume" key="2">
        Generate Resume
      </Tabs.TabPane>
    </Tabs>
  </div>
  )
}

export default Resume