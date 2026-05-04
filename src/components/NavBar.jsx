import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
        dispatch(removeUser());
        return navigate("/login");
      } catch (err) {
        console.log(err.message);
      }
    }

    return (
    <div>
        <div className="navbar bg-base-300 shadow-sm">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">DevConnect</Link>
          </div>
          {user && <div className="flex items-center">
            <p className="px-4">Hey welcome {user.firstName} </p>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="mr-5 btn btn-ghost btn-circle avatar">
                
                <div className="w-10 rounded-full">
                  <img
                    className="object-cover"
                    alt="profile photo"
                    src={user.profileImageURL} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow-xl">
                <li>
                  <Link to="/profile/edit" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><Link to="/">Feed</Link></li>
                <li><Link to="/connections">Connections</Link></li>
                <li><Link to="requests">Requests</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>}
        </div>
      </div>
    )
}

export default NavBar;