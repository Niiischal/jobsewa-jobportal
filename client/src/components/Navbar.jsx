import { Button } from "antd";

const Navbar = () => {
  return (
      <div className="navbar flex justify-between items-centeer pl-[2rem] pr-[2rem]">
        <div className="logo-div">
          <h1 className="logo text-[25.4px] text-primary">
            JobSewa
          </h1>
        </div>
        <div className="nav-items flex gap-6 pt-[1.6rem]">
            <li className="nav-lists hover:text-primary text-[#848484]">Home</li>
            <li className="nav-lists hover:text-primary text-[#848484]">About</li>
            <li className="nav-lists hover:text-primary text-[#848484]">Employees/Post Job</li>
            <li className="nav-lists hover:text-primary text-[#848484]">Sign In</li>
        </div>
      </div>
  );
};

export default Navbar;
