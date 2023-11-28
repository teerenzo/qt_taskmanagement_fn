import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import isPublic from "../utils/isPublic";
import { ToastContainer, toast } from "react-toastify";
import LoginImage from '../assets/images/loginImage.png';
import Footer from './includes/footer';
import { useDispatch,useSelector } from "react-redux";
import { login } from "../redux/features/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const {loading,error} = useSelector((state) => state.users);
  useEffect(() => {
    isPublic();
  }, []);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isLoading, setIsLoading] = useState(false);


  const handlelogin = async (e) => {
    e.preventDefault();

    if(email === "" || password === ""){
      toast.error("Please fill all the fields");
      return;
    }
    setIsLoading(true);

    dispatch(login({email, password})).then((res) => {
      console.log(res);
      if(res&&res.payload&&res.error){
        console.log(error);
        toast.error("wrong credentials");
        setIsLoading(false);
      }else{
        toast.success("Login Successfull");
        setIsLoading(false);
        window.location.replace("/dashboard");

  
      }
    }).catch((err) => {
    setIsLoading(false);
      toast.error("Error Occured");
    });


    
  };

  return (
    <div className="App">
      <ToastContainer />
      <section class="  flex  justify-center">
  <div class="container h-[80vh]  px-6  bg-white mb-10">
      <div
      class="g-6 flex h-auto flex-wrap items-center justify-center mt-10 md:mt-auto">
  <div class="mb-8 md:mb-0 md:w-8/12 lg:w-6/12 hidden md:flex  ">
        <img
          src={LoginImage}
          class="w-full"
          alt="Phone image" />
      </div>
      <div className="form">
        <div className="login">
          <input
            type="text"
            placeholder="Email, Username or Phone number"
            name="indetifier"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          {
            isLoading ? (
              <button className="bg-blue-200">Loading...</button>
            ) : (
              <button className="bg-[#015AAB]" onClick={handlelogin}>login</button>
            )
          }
      
      
          <div
            class="my-4 flex items-center before:mt-0.5 ">
            <p
              class="mx-4 mb-0 text-center font-semibold ">
              New to site?
            </p>
        
            <a class="text-[#015AAB]" >
            <Link to="/signup">sign up</Link>
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

export default Login;
