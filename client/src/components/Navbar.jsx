import { Button } from "antd";

const Navbar = () => {
  return (
      <div className="navbar flex justify-between items-center pl-[2rem] pr-[2rem]">
        <div className="logo-div">
          <h1 className="logo text-[27px] text-primary">
            JobSewa
          </h1>
        </div>
        <div className="nav-items flex gap-9 items-center">
            <li className=" hover:text-primary text-[#848484] text-[1.1rem] ">Login</li>
            <li className=""><Button type="primary">Post A Job</Button></li>
        </div>
      </div>
  );
};

export default Navbar;
