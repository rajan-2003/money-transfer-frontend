const URL=import.meta.env.VITE_URL;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Home() {
  const navigate = useNavigate();
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
    else navigate("/signin");
  }
  useEffect(() => {
    authCheck();
  }, []);

  return <div>Loading...</div>;
}
