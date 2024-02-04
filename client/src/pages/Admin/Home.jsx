import { Tabs } from "antd";
import React from "react";

function Home() {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Users" key="1"></Tabs.TabPane>
        <Tabs.TabPane tab="Jobs" key="2"></Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Home;
