import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import isPublic from "../utils/isPublic";
import { ToastContainer, toast } from "react-toastify";
import LoginImage from '../assets/images/loginImage.png';
import Footer from './includes/footer';

const Signup = () => {
  useEffect(() => {
    isPublic();
  }, []);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dob, setdob] = useState("");
  const [phoneNumber, setphone] = useState("");
  const [email, setemail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlesignup = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("passwords do not match");
      return;
    }
    setIsLoading(true);
    const data = {
      firstName,
      lastName,
      dob,
      phoneNumber:parseInt(phoneNumber),
      email,
      userName,
      password,
      address:"kigali"
      
    };


    let config = {
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
       setTimeout(() => {
        window.location.replace("/login");
        }, 2000);
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
  <div class="container h-[80vh] px-6  bg-white mb-10 pt-10 md:pt-0">
      <div
      class="g-6 flex h-auto flex-wrap items-center justify-center">
  <div class="mb-8 md:mb-0 md:w-8/12 lg:w-6/12 hidden md:flex">
        <img
          src={LoginImage}
          class="w-full"
          alt="Phone image" />
      </div>
      <div className="form">
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
              value={dob}
              onChange={(e) => setdob(e.target.value)}
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
       
       <div className="divider"></div>
         
              <input
                type="text"
                placeholder="email"
                name="indetifier"
                
                value={email}
                onChange={(e) => setemail(e.target.value)}
              ></input>

      
          </div>
          <div className="rowInput">
            <input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            ></input>
            <div className="divider"></div>
            <input
              type="password"
              placeholder="Comfirm password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            ></input>
          </div>

          {
            isLoading ? (
              <button className="bg-blue-200">Loading...</button>
            ) : (
              <button className="bg-[#015AAB]" onClick={(e)=>handlesignup(e)}>sign up</button>
            )
          }
          <div
            class="my-4 flex items-center before:mt-0.5 ">
            <p
              class="mx-4 mb-0 text-center font-semibold ">
              have an account?
            </p>
        
            <a class="text-[#015AAB]" href="/login">
            <Link to="/login">login</Link>
            </a>

            <a class="text-[#015AAB] mx-10" href="/">
            Back Home
            </a>
          </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        <Footer/>
      </div>
  
  );
};

export default Signup;
