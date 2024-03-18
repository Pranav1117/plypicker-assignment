import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../Assets/LoginPage-img/aq.png";
import "./auth.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [err, setErr] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   let token = localStorage.getItem("ply-token");

  //   const checkUserLoggedIn = async () => {
  //     try {
  //       if (token) {
  //         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //         let { data } = await axios.get("http://localhost:3001/getuser");

  //         if (data.user) {
  //           dispatch(setUser(data.user));
  //           navigate(`/dashboard/${data.user.role}`);
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   checkUserLoggedIn();
  // }, []);

  const handleNav = () => {
    navigate("/register");
  };

  const handleOnChange = (e) => {
    setErr("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:3001/login", formData);
      console.log(resp.data.user);
      if (resp.data.token) {
        localStorage.setItem("ply-token", resp.data.token);
        dispatch(setUser(resp.data.user));
        console.log(resp.data.user);
        navigate(`/dashboard/${resp.data.user.role}`);
      }
    } catch (error) {
      setErr(error.response.data);
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="username"
          name="email"
          value={formData.email}
          placeholder="Enter Username"
          onChange={(e) => {
            handleOnChange(e);
          }}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          placeholder="Enter Password"
          onChange={(e) => {
            handleOnChange(e);
          }}
        />

        <div className="role-select-wrapper">
          <div>
            <input
              type="radio"
              value="admin"
              name="role"
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
            Admin
          </div>

          <div>
            <input
              type="radio"
              value="team member"
              name="role"
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
            Team Member
          </div>
        </div>

        <button
          type="submit"
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          Login
        </button>

        <p className="err-para">{err && err.message}</p>

        <p className="nav-to-register" onClick={handleNav}>
          New user? Register here
        </p>
      </div>

      <div className="login-image">
        <img src={bgImage} alt="Login Image" />{" "}
      </div>
    </div>
  );
};

export default Login;
