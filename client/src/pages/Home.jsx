import Navbar from "../components/Navbar";
import Search from "../components/SearchBar"
const Home = () => {
  return (
    <div>
      <Navbar label="login" />
      <div className="flex justify-center items-center pt-5">
        <Search/>
      </div>
    </div>
  );
};

export default Home;
