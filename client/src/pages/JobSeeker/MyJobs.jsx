import { Tabs } from "antd";
import React from "react";
import AppliedJobs from "./AppliedJobs";
import Interest from "./Interest";
import SavedJobs from "./SavedJobs";

function MyJobs() {
  return (
    <div className="pl-[1rem] pr-[1rem]">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Saved Jobs" key="1">
          <SavedJobs/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Applied Jobs" key="2">
          <AppliedJobs />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Post Interest" key="3">
          <Interest/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default MyJobs;
