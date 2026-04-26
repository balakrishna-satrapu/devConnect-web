import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  const handleSignupClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/profile/edit");
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="w-screen h-[80vh] flex items-center justify-center">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-6">
        <p className="text-lg flex justify-center">{isSignup ? "Signup" : "Login"}</p>
        
        {isSignup && <div>
          <label className="mt-2 label">FirstName</label>
          <input
            type="text"
            className="input"
            placeholder="FirstName"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          
          <label className="mt-2 label">LastName</label>
          <input
            type="text"
            className="mb-2 input"
            placeholder="LastName"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>}

        <label className="mt-2 label">Email Id</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(event) => {
            setEmailId(event.target.value);
          }}
        />

        <label className="mt-2 label">Password</label>
        <input
          type="password"
          className="mb-2 input"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <p className="text-sm text-red-400">{error}</p>
        <button className="btn btn-primary my-2" onClick={isSignup ? handleSignupClick : handleLoginClick}>
          Submit
        </button>
        <button 
          className="cursor-pointer"
          onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Have an account? Login" : "Signup"}
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
