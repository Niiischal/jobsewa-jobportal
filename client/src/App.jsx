import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedPage from "./components/ProtectedPage";
import ProtectedHome from "./pages/JobSeeker/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/OTP"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/resetPassword" element= {<ResetPassword/>} />
          <Route
            path="/jobseeker-home"
            element={
              <ProtectedPage>
                <ProtectedHome />
              </ProtectedPage>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
