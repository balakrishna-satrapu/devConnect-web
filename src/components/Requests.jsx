import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
    const [requests, setRequests] = useState([]);

    const handleReviewRequest = async (status, id) => {
        try {
            await axios.post(BASE_URL + "/request/review/" + status + "/" + id, {}, { withCredentials: true});
            const newRequests = requests.filter(request => id !== request._id);
            setRequests(newRequests);
        } catch(err) {
            console.log(err.message);
        }
    }

    const fetchConnectionRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests", { withCredentials: true});
            setRequests(res.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchConnectionRequests();
    }, []);

    if(!requests || requests.length === 0)  return <h1  className="text-xl my-8 text-center">No Requests Found</h1>;

    return (
        <div>
            <h1 className="text-xl my-8 text-center">Connections Requests</h1>
            <div>
                {requests.map(request => {
                    const {firstName, lastName, age, gender, about, profileImageURL} = request.senderUserId;
                    return (
                        <div key={request._id} className="bg-base-300 p-4 flex justify-between rounded-3xl w-140 my-5 mx-auto items-center border border-gray-800">
                            <div className="flex gap-6 items-center">
                                <div>
                                <img className="w-16 h-16 object-cover rounded-full" src={profileImageURL} alt="connection Image" />
                                </div>
                                <div>
                                    <p>{firstName} {lastName}</p>
                                    <p>{age} {gender}</p>
                                    <p>{about}</p>
                                </div>
                            </div>

                             <div>
                                <button
                                    onClick={() => handleReviewRequest("rejected", request._id)}
                                    className="btn btn-secondary m-4"
                                    >
                                    reject
                                </button>
                                <button
                                    onClick={() => handleReviewRequest("accepted", request._id)}
                                    className="btn btn-primary"
                                    >
                                    Accept
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Requests;