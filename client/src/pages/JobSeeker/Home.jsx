import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import AppliedJobs from "./AppliedJobs";
import Interest from "./Interest";
import Jobs from "./Jobs";
import Resume from "./Resume";
import SavedJobs from "./SavedJobs";

function Home() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      {user.role === "jobSeeker" && (
        <div>
          <Jobs/>
        </div>
      )}
    </div>
  );
}

export default Home;
