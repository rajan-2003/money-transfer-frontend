// const URL=process.env.REACT_APP_URL;
const URL=import.meta.env.VITE_URL;
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate=useNavigate();
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    axios
      .get(`${URL}/api/v1/user/detail`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log("here");
        setFirstName(res.data.firstName);
      });
  }, []);
  // console.log(firstName);

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4 text-blue-600 font-black text-lg">
        PayTM App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4 ">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {firstName[0]}
          </div>
        </div>
        <div className="flex">
          <button onClick={()=>{
            localStorage.clear();
            navigate("/signin")
          }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
