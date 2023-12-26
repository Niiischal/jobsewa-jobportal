import { Button } from "antd";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
      <div className="navbar flex justify-between items-center pl-[2rem] pr-[2rem]">
        <div className="logo-div">
          <Link to='/' className="no-underline"><h1 className="logo text-[27px] text-primary">JobSewa</h1></Link>
        </div>
        <div className="nav-items flex gap-9 items-center">
            <li className=" hover:text-primary text-primary text-[1.1rem] ">Login</li>
            <li className=""><Button type="primary">Post A Job</Button></li>
        </div>
      </div>
  );
};

export default Navbar;
