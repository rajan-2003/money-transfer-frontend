
const URL=import.meta.env.VITE_URL;

import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
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
    
    // if (result) navigate("/dashboard");
    if (!result) navigate(-1);
    
  }
  useEffect(() => {
    authCheck();
  }, []);

  const [bal, setBal] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    axios
      .get(`${URL}/api/v1/account/balance`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setBal(res.data.balance));

    axios
      .get(`${URL}/api/v1/user/detail`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setUsername(res.data.username);
      });
  });
  return (
    <div>
      <Appbar></Appbar>
      <div className="text-center text-lg font-bold mt-4">
        <p>
          Account Holder Name:{" "}
          <span className="text-orange-500">{firstName + " " + lastName}</span>
        </p>
        <p className="mb-2">
          Username: <span className="text-teal-700">{username}</span>
        </p>
      </div>

      <div className="m-8">
        <Balance value={bal}></Balance>
        <Users></Users>
      </div>
    </div>
  );
}
