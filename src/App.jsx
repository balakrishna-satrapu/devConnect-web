import NavBar from "./components/NavBar";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Feed from "./components/Feed";
import { addUser } from "./utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import {BASE_URL} from "./utils/constants.js";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const existingUser = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      if (existingUser) return;

      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user?.data));
    } catch (err) {
      console.log(err.message);
      return navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/profile/edit" element={<Profile />} />
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/Requests" element={<Requests />} />
      </Routes>
    </div>
  );
}

export default App;
