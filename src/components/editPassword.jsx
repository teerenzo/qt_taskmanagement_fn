import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import isPublic from "../utils/isPublic";
import { ToastContainer, toast } from "react-toastify";

import Footer from './includes/footer';

const EditPassword = () => {
    // get user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

  const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);






  const handlesignup = async (e) => {
    e.preventDefault();
    const data = {
      password:oldPassword,
        newPassword:newPassword
    };

  setIsLoading(true);

    let config = {
      method: "put",
      url: `${process.env.REACT_APP_BACKEND_URL}/auth/change-password`,
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      data: data,
    };
    axios
      .request(config)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message);
      });


  };
  return (
    <div className="App">
      <ToastContainer/>   
      <section class="  flex  justify-center">
  <div class="container h-[80vh] px-6  bg-white mb-10">
      <div
      class="g-6 flex h-auto flex-wrap items-center p-10 justify-center">

      <div className="form mb-8 ">
        <div className="register">
     
      
          <div className="rowInput">
            
              <input
                type="password"
                placeholder="Old Password"
                name="password"
                value={oldPassword}
                onChange={(e) => setoldPassword(e.target.value)}
              ></input>
       

      
          </div>
          <div className="rowInput">
            
            <input
              type="password"
              placeholder="new Password"
              name="npassword"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
            ></input>
    
        </div>

{isLoading ? (
   <button className="btn" disabled>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </button>
  ) : (
    <button onClick={(e)=>handlesignup(e)}>Update</button>
  )  
}


      
        </div>
        </div>
        </div>
        </div>
        </section>
        <Footer/>
      </div>
  
  );
};

export default EditPassword;
