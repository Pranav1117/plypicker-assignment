import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Profile.css"; // Import the CSS file for your profile styling
import Navbar from "../../Components/Navbar/Navbar";

const Profile = () => {
  const { email, role } = useSelector((state) => state.user);
  const [req, setReq] = useState({
    pendingRequest: 0,
    completeRequest: 0,
    allRequest: 0,
  });

  useEffect(() => {
    const getAllReq = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/getallrequests"
        );

        setReq((prevState) => ({
          ...prevState,
          pendingRequest: data.allRequests.filter(
            (req) => req.status === "pending"
          ).length,
          completeRequest: data.allRequests.filter(
            (req) => req.status === "approved"
          ).length,
          allRequest: data.allRequests.length,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getAllReq();
  }, []);

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2 className="profile-name">Name: {email}</h2>
        <h3 className="profile-role">Role: {role}</h3>
        <div className="profile-info">
          Total number of Requests: {req.allRequest}
        </div>
        <div className="profile-info">
          Pending Requests: {req.pendingRequest}
        </div>
        <div className="profile-info">
          Approved Requests: {req.completeRequest}
        </div>
      </div>
    </>
  );
};

export default Profile;
