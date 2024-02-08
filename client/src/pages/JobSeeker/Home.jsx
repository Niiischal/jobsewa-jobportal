import { Tabs } from 'antd';
import React from 'react';
import { useSelector } from "react-redux";
import Resume from './Resume';
import Jobs from './Jobs';

function Home() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      {user.role === "jobSeeker" && (
          <div>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Upload Resume" key="1">
                <div className="flex justify-center items-center">
                  <Resume/>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span>Job Seeker Tab 2</span>} key="2">
                <Jobs/>
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
    </div>
  )
}

export default Home
