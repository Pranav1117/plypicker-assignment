import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../Assets/LoginPage-img/register.jpeg";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/userSlice";
const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [err, setErr] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // let token = localStorage.getItem("ply-token");
    // const checkUserLoggedIn = async () => {
    //   try {
    //     if (token) {
    //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //       let { data } = await axios.get("http://localhost:3001/getuser");
    //       dispatch(setUser(data));
    //       if (data.user) {
    //         dispatch(setUser(data.user));
    //         navigate(`/dashboard/${data.user.role}`);
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // checkUserLoggedIn();
  }, []);

  const handleOnChange = (e) => {
    setErr("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    try {
      const resp = await axios.post("http://localhost:3001/register", formData);

      if (resp.data.token) {
        localStorage.setItem("ply-token", resp.data.token);
        setUser(resp.data.user)
        navigate(`/dashboard/${resp.data.role}`);
      }
    } catch (error) {
      setErr(error.response.data);

      console.log(error.response);
    }
  };

  const handleNav = () => {
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Register</h1>

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
              onClick={(e) => {
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
              onClick={(e) => {
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
          Register
        </button>
        <p className="err-para">{err && err.message}</p>

        <p className="nav-to-register" onClick={handleNav}>
          Already reistered? Login here
        </p>
      </div>

      <div className="login-image">
        <img src={bgImage} alt="Login Image" />{" "}
      </div>
    </div>
  );
};

export default Register;
