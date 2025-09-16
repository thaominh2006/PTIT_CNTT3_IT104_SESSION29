import axios from "axios";
import React, { useEffect, useState } from "react";
interface User {
  id: number;
  name: string;
}
export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  async function getAllUser() {
    const res = await axios.get("http://localhost:8000/user");
    console.log("gia tri tra ve: ", res);
    setUsers(res.data);
  }
  useEffect(() => {
    getAllUser();
  }, []);
  const addUser = async () => {
    const res = await axios.post("http://localhost:8000/user",
      {
        name: name
      }
    );
    setUsers([...users, res.data]);
    setName("");
  }
  const deleteUser = async (id: number) => {
    await axios.delete(`http://localhost:8000/user/${id}`);
    setUsers(users.filter((u) => u.id !== id));
  }
  return (
    <div>
      <h1>Hoc API</h1>
      <h2>Danh sach user</h2>
      <input type="text" placeholder="nhap ten" value={name} onChange={(e) => setName(e.target.value)}/>
      <button onClick={addUser}>Them</button>
      <ul>
        {users.map((user, index) => (
          <li key={user.id}>
            {index + 1}. {user.name}
            <button onClick={() => deleteUser(user.id)}>Xoa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
