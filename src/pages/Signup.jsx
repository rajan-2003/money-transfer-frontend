const URL=import.meta.env.VITE_URL;
import { Heading } from "../components/Header";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState,useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function Signup() {
    const navigate=useNavigate();
  async function authCheck() {
    const token = localStorage.getItem("token");
    let result = false;
    if (token) {
      const res = await axios.get(`${URL}/api/v1/user/check/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      result=res.data.loggedin;
    } 
    
    if (result) navigate("/dashboard");
    // else navigate("/signup");
  }
  useEffect(() => {
    authCheck();
  }, []);
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        
          <Heading label="Sign Up"></Heading>
          <SubHeading label="Enter your infromation to create an account"></SubHeading>
          <InputBox onChange={(e)=>{setFirstName(e.target.value)} } placeholder="John" label={"First Name"} />
          <InputBox onChange={(e)=>{setLastName(e.target.value)} } placeholder="Doe" label={"Last Name"} />
          <InputBox onChange={(e)=>{setUsername(e.target.value)} } placeholder="rajan@gmail.com" label={"Email"} />
          <InputBox onChange={(e)=>{setPassword(e.target.value)} } placeholder="123456" label={"Password"} />

          <div className="pt-4">
          <Button onClick={
          async ()=>{
            const response=await axios.post(`${URL}/api/v1/user/signup`,{
                username,
                firstName,
                lastName,
                password
            });
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard");
          }
        } label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
}
