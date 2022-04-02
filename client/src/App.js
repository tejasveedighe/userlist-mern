import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3001/getUsers")
            .then((res) => {
                setUsersList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const addUser = (event) => {
        event.preventDefault();
        const user = {
            name: name,
            email: email,
        };
        Axios.post("http://localhost:3001/createUser", user)
            .then((res) => {
                setUsersList([...usersList, user]);
                setName("");
                setEmail("");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="App">
            <ul className="users">
                {usersList.map((user) => (
                    <li className="user" key={user.id}>
                        <div className="user-name">Name: {user.name}</div>
                        <div className="user-email">Email: {user.email}</div>
                    </li>
                ))}
            </ul>
            <h1>Add user</h1>
            <form onSubmit={addUser}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <button type="submit">Add user</button>
            </form>
        </div>
    );
}

export default App;
