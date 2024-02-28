import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import ProtectedPage from "./components/ProtectedPage";
import ProtectedAHome from "./pages/Admin/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import ProtectedJPHome from "./pages/JobProvider/Home";
import ProtectedJSHome from "./pages/JobSeeker/Home";
import MyJobs from "./pages/JobSeeker/MyJobs";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTP";
import Profile from "./pages/Profile";
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
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route
            path="/my-jobs"
            element={
              <ProtectedPage>
                <MyJobs />
              </ProtectedPage>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
