import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedPage from "./components/ProtectedPage";
import ProtectedHome from "./pages/JobSeeker/Home";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route
            path="/jobseeker-home"
            element={
              <ProtectedPage>
                <ProtectedHome />
              </ProtectedPage>
            }
          />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
