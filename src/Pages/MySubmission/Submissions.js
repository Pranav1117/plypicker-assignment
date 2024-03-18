import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import "./Submissions.css";

const Submissions = () => {
  const { email } = useSelector((state) => state.user);
  const [userRequest, setUserReq] = useState([]);

  useEffect(() => {
    const getMyReq = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/getusersreq/${email}`
        );
        setUserReq(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user requests:", error);
      }
    };

    getMyReq();
  }, [email]);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} 
    Time- ${formattedTime}`;
  };

  return (
    <>
      <Navbar />
      <div className="submissions-container">
        <h3 className="submissions-title">My Submissions :</h3>
        <div className="requests-list">
          {userRequest.length > 0 ? (
            userRequest.map((request, index) => (
              <div key={index} className="request-item">
                <div className="request-info">
                  Name: {request.changes.productName}
                </div>
                <div className="request-info">
                  Product Id: {request.productId}
                </div>
                <div className="request-info">Status: {request.status}</div>
                <div className="request-info">
                  Request created on: {formatDateTime(request.createdAt)}
                </div>
              </div>
            ))
          ) : (
            <div className="no-requests">No Requests</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Submissions;
