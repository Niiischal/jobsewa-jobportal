import Navbar from "../components/Navbar";
import Search from "../components/SearchBar";
const Home = () => {
  return (
    <div>
      <Navbar label="login"/>
      <div className="flex flex-col items-center ">
        <h1 className="mr-10">
          Find the <span className="text-primary">right</span> job <span className="text-primary">.</span>
        </h1>
        <Search />
      </div>
    </div>
  );
};

export default Home;
