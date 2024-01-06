import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedPage from "./components/ProtectedPage";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import ProtectedHome from "./pages/JobSeeker/Home";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTP";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/verifyOTP" element= {<OTPVerification/>} />
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
