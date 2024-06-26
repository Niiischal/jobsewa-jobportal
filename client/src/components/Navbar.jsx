import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className="navbar flex justify-between items-center pl-[2rem] pr-[2rem] ">
      <div className="logo-div">
        <Link to="/" className="no-underline">
          <h1 className="logo text-[27px] text-primary">JobSewa</h1>
        </Link>
      </div>
      <div className="nav-items flex gap-9 items-center">
        <Link to="/login">
          <li className=" hover:text-black text-primary text-[1.2rem] ">
            {props.label}
          </li>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
