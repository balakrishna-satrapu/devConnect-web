import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
    const [emailId, setEmailId] = useState("rohit@gmail.com");
    const [password, setPassword] = useState("Rohit@123");
    const dispatch = useDispatch();

    const handleLoginClick = async () => {
        const res = await axios.post("http://localhost:7777/login",
            { emailId, password }, 
            { withCredentials: true }
        );
        dispatch(addUser(res.data));
    }

    return (
    <div className="w-screen h-[80vh] flex items-center justify-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6">
          <p className="text-lg flex justify-center">Login</p>

          <label className="mt-2 label">Email Id</label>
          <input 
            type="email" 
            className="input" 
            placeholder="Email" 
            value={emailId} 
            onChange={(event) => {
                setEmailId(event.target.value);
            }} />

          <label className="mt-2 label">Password</label>
          <input 
            type="password" 
            className="mb-2 input" 
            placeholder="Password" 
            value={password} 
            onChange={(event) => {
                setPassword(event.target.value);
            }}/>

          <button className="btn btn-neutral my-6" onClick={handleLoginClick}>Submit</button>
        </fieldset>
    </div>
    )
}

export default Login;