import React from "react";
import { useSelector } from "react-redux";
import Jobs from "./Jobs";

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
