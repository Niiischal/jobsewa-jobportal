import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import ProtectedPage from "./components/ProtectedPage";
import ProtectedAHome from "./pages/Admin/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import ProtectedJPHome from "./pages/JobProvider/Home";
import ProtectedJSHome from "./pages/JobSeeker/Home";
import JobDetails from "./pages/JobSeeker/JobDetails";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTP";
import Signup from "./pages/Signup";

function App() {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div>
      {loading && <Loader />}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/verifyOTP" element={<OTPVerification />} />
          <Route
            path="/jobseeker-home"
            element={
              <ProtectedPage>
                <ProtectedJSHome />
              </ProtectedPage>
            }
          />
                    <Route
            path="/jobprovider-home"
            element={
              <ProtectedPage>
                <ProtectedJPHome />
              </ProtectedPage>
            }
          />
                    <Route
            path="/admin-home"
            element={
              <ProtectedPage>
                <ProtectedAHome />
              </ProtectedPage>
            }
          />
                              <Route
            path="/job-details"
            element={
              <ProtectedPage>
                <JobDetails />
              </ProtectedPage>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
