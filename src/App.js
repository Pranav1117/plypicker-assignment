import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Authentication/Register";
import Login from "./Pages/Authentication/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetail/ProductDetails";
import Profile from "./Pages/Profile/Profile";
import PendingRequests from "./Pages/PendingReq/PendingRequests";
import DetailsOFPendingReq from "./Pages/PendingReq/DetailsOFPendingReq";
import Submissions from "./Pages/MySubmission/Submissions";
import "./style.css";
import NotFound from "./Pages/NotFound";
import Navbar from "./Components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUser } from "./features/userSlice";
import Unauthorized from "./Pages/Unauthorized";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("ply-token");

    const checkUserLoggedIn = async () => {
      try {
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          let { data } = await axios.get("http://localhost:3001/getuser");
          if (data.user) {
            dispatch(setUser(data.user));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserLoggedIn();
  }, []);

  const { email, role } = useSelector((state) => state.user);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard/:role"
            element={email ? <Dashboard /> : <Unauthorized />}
          />
          <Route path="/product/:product_id" element={<ProductDetails />} />
          <Route
            path="/profile"
            element={email ? <Profile /> : <Unauthorized />}
          />
          <Route
            path="/profile/my-submissions"
            element={
              role === "team member" ? <Submissions /> : <Unauthorized />
            }
          />
          <Route
            path="/pending-requests"
            element={role === "admin" ? <PendingRequests /> : <Unauthorized />}
          />
          <Route
            path="/pending-requests/:request_id"
            element={
              role === "admin" ? <DetailsOFPendingReq /> : <Unauthorized />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
