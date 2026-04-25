import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const userCards = await axios.get("http://localhost:7777/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(userCards?.data));
    } catch (err) {
      console.log(err.message);
      return navigate("/login");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0) {
    return <div className="flex justify-center mt-15">No users found!</div>;
  }

  return (
    <div className="flex justify-center mt-14">
      {feed && (
        <div className="card bg-base-300 w-68 shadow-sm">
          <figure>
            <img src={feed[0]?.profileImageURL} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {feed[0]?.firstName} {feed[0]?.lastName}
            </h2>
            <p>
              {feed[0]?.age} {feed[0]?.gender}
            </p>
            <p>{feed[0]?.about}</p>
            <div className="card-actions justify-center gap-6">
              <button className="btn btn-secondary">Ignore</button>
              <button className="btn btn-primary">Connect</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
