import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import isPublic from "../utils/isPublic";
import { ToastContainer, toast } from "react-toastify";

import Footer from './includes/footer';

const Profile = () => {
    // get user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

  const [firstName, setfirstName] = useState(user.firstName||"");
  const [lastName, setlastName] = useState(user.lastName||"");
  const [dob, setdob] = useState(user.dob? new Date(Date.parse(user.dob)): "");
  const [phoneNumber, setphone] = useState(user.phoneNumber||"");
  const [email, setemail] = useState(user.email||"");
  const [userName, setuserName] = useState(user.userName||"");
  const [address, setaddress] = useState(user.address||"");
  const [dobDate, setdobDate] = useState(dob.getDate());
  const [isLoading, setIsLoading] = useState(false);




  const handlesignup = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      dob,
      phoneNumber:parseInt(phoneNumber),
      userName,
      address:address,
      
    };

  setIsLoading(true);
    let config = {
      method: "put",
      url: `${process.env.REACT_APP_BACKEND_URL}/auth/edit`,
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      data: data,
    };
    axios
      .request(config)
      .then((res) => {
        toast.success(res.data.message);
        console.log(JSON.stringify(res.data));
        // update local storage
        setIsLoading(false);
        localStorage.setItem("user", JSON.stringify(data));
        setTimeout(() => {
        window.location.reload()
        },2000)
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
  {/* <div class="mb-8 md:mb-0 md:w-8/12 lg:w-6/12 ">
        <img
          src={LoginImage}
          class="w-full"
          alt="Phone image" />
      </div> */}
      <div className="form mb-8 ">
        <div className="register">
     
          <div className="rowInput">
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            ></input>
            <div className="divider"></div>
            <input
              type="text"
              placeholder="Last Name"
              name="name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            ></input>
          </div>
          <div className="rowInput">
            <input
              type="date"
              placeholder="dob"
              name="dob"
              value={`${dob.getFullYear()}-${dob.getMonth()+1}-${dob.getDate()}`}
              onChange={(e) => setdob(
                new Date(e.target.value)
              )}
            ></input>
            <div className="divider"></div>
         
              <input
                type="text"
                placeholder="Username"
                name="indetifier"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
              ></input>
         </div>
          <div className="rowInput">
            
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={phoneNumber}
                onChange={(e) => setphone(e.target.value)}
              ></input>
       

      
          </div>
          <div className="rowInput">
            <textarea className="w-full rounded-[7px] border border-blue-gray-200  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 placeholder-shown:border   my-5" name="address" id="" cols="30" rows="2" value={address} onChange={(e)=>setaddress(e.target.value)} ></textarea>
     
          </div>

          {
            isLoading ? (
              <button className="bg-blue-200">Loading...</button>
            ) : (
              <button className="bg-[#015AAB]" onClick={(e)=>handlesignup(e)}>Update</button>
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

export default Profile;
