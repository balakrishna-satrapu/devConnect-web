import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFeed, removeUser } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);

  const handleSendRequest = async (status, id) => {
    try {
      await axios.post("http://localhost:7777/request/send/" + status + "/" + id, {}, { withCredentials: true});
      dispatch(removeUser(id));
    } catch (err) {
      console.log(err.message);
    }
  }

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

  if(!feed[0] || feed.length === 0) return <h1>No user found</h1>;

  return (
    <div className="flex justify-center mt-14">
      {feed && (
        <div className="card bg-base-300 w-68 shadow-sm">
          <figure>
            <img className="h-42 object-cover" src={feed[0]?.profileImageURL} alt="Shoes" />
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
              <button 
                onClick={() => handleSendRequest("ignored", feed[0]._id)}
                className="btn btn-secondary"
                >
                Ignore
              </button>
              <button 
                onClick={() => handleSendRequest("interested", feed[0]._id)}
                className="btn btn-primary"
                >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
