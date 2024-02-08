import { AndroidOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Jobs from "./Jobs";

function Home() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      {user.role === "jobProvider" && (
        <div>
          <Tabs defaultActiveKey="1" centered>
            <Tabs.TabPane
              tab={
                <span className="flex gap-2 items-center">
                  <IoPersonAddOutline />
                  Add Jobs
                </span>
              }
              key="1"
            >
              <Jobs />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span>
                  <AndroidOutlined />
                  Job Provider Tab 2
                </span>
              }
              key="2"
            >
              {/* Content for Job Provider Tab 2 */}
            </Tabs.TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default Home;
