import { useState, useEffect } from "react";
import axios from "axios";

const Connections = () => {
    const [connections, setConnections] = useState([]);
    const fetchConnections = async () => {
        try {
            const res = await axios.get("http://localhost:7777/user/connections", { withCredentials: true});
            console.log(res);
            setConnections(res.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections[0] || connections.length === 0) return <h1>No Connections Found!!!</h1>;

    return (
        <div>
            <h1 className="text-xl my-8 text-center">Connections</h1>
        <div>
            {connections.map(connection => {
                const {firstName, lastName, age, gender, about, profileImageURL} = connection;
                return (
                    <div className="bg-base-300 p-4 rounded-3xl flex gap-4 w-100 my-5 mx-auto items-center">
                        <div>
                            <img className="w-16 h-16 rounded-full" src={profileImageURL} alt="connection Image" />
                        </div>
                        <div>
                            <p>{firstName} {lastName}</p>
                            <p>{age} {gender}</p>
                            <p>{about}</p>
                        </div>
                    </div>
                );
            })}
        </div>
        </div>
    );
}

export default Connections;