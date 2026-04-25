import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [profileImageURL, setProfileImageURL] = useState(
    user?.profileImageURL || "",
  );
  const [about, setAbout] = useState(user?.about || "");

  const dispatch = useDispatch();

  const handleSaveDetails = async () => {
    try {
      const newDetails = {
        firstName,
        lastName,
        age,
        gender,
        about,
        profileImageURL,
      };
      await axios.patch("http://localhost:7777/profile/edit", newDetails, {
        withCredentials: true,
      });
      dispatch(addUser(newDetails));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center mt-6 gap-10">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-6">
        <p className="text-lg flex justify-center">Edit Profile</p>

        <label className="label">FirstName</label>
        <input
          type="text"
          className="input"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />

        <label className="label">LastName</label>
        <input
          type="text"
          className="input"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />

        <label className="label">Age</label>
        <input
          type="text"
          className="input"
          value={age}
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

        <label className="label">Profile Image URL</label>
        <input
          type="text"
          className="input"
          value={profileImageURL}
          onChange={(event) => {
            setProfileImageURL(event.target.value);
          }}
        />

        <label className="label">Gender</label>
        <input
          type="text"
          className="input"
          value={gender}
          onChange={(event) => {
            setGender(event.target.value);
          }}
        />

        <label className="label">About</label>
        <input
          type="text"
          className="input"
          value={about}
          onChange={(event) => {
            setAbout(event.target.value);
          }}
        />

        <button className="btn btn-primary mt-4" onClick={handleSaveDetails}>
          Save Details
        </button>
      </fieldset>
        <div className="card bg-base-300 h-90 w-68 shadow-sm">
          <figure>
            <img src={profileImageURL} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {firstName} {lastName}
            </h2>
            <p>
              {age} {gender}
            </p>
            <p>{about}</p>
            <div className="card-actions justify-center gap-6">
              <button className="btn btn-secondary">Ignore</button>
              <button className="btn btn-primary">Connect</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Profile;
