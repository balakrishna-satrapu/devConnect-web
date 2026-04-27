import { useState, useEffect } from "react";
import axios from "axios";

const Connections = () => {
    const [connections, setConnections] = useState([]);
    const fetchConnections = async () => {
        try {
            const res = await axios.get("http://localhost:7777/user/connections", { withCredentials: true});
            setConnections(res.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections || connections.length === 0) return <h1  className="text-xl my-8 text-center">No Connections Found</h1>;

    return (
        <div>
            <h1 className="text-xl my-8 text-center">Connections</h1>
        <div>
            {connections.map(connection => {
                const {_id, firstName, lastName, age, gender, about, profileImageURL} = connection;
                return (
                    <div key={_id} className="bg-base-300 p-4 rounded-3xl flex gap-6 w-108 my-5 mx-auto items-center border border-gray-800">
                        <div>
                            <img className="w-16 h-16 object-cover rounded-full" src={profileImageURL} alt="connection Image" />
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