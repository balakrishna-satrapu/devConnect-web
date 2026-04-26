import { useState, useEffect } from "react";
import axios from "axios";

const Requests = () => {
    const [connections, setConnections] = useState([]);
    const fetchConnectionRequests = async () => {
        try {
            const res = await axios.get("http://localhost:7777/user/requests", { withCredentials: true});
            console.log(res.data);
            console.log()
            setConnections(res.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchConnectionRequests();
    }, []);

    return (
        <div>
            <h1 className="my-8 text-center">Connections Requests</h1>
            <div>
                {connections.map(connection => {
                    const {firstName, lastName, age, gender, about, profileImageURL} = connection.senderUserId;
                    return (
                        <div className="bg-base-300 p-4 rounded-3xl flex justify-between w-1/2 my-5 mx-auto items-center">
                            <div>
                                <img className="w-16 h-16 rounded-full" src={profileImageURL} alt="connection Image" />
                            </div>
                            <div>
                                <p>{firstName} {lastName}</p>
                                <p>{age} {gender}</p>
                                <p>{about}</p>
                            </div>

                             <div>
                                <button className="btn btn-secondary m-4">reject</button>
                                <button className="btn btn-primary">Accept</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Requests;