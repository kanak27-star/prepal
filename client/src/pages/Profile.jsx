import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const updateProfile = async () => {
    try {
      const res = await API.put("/user/profile", {
        name,
        email,
      });

      alert("Profile updated successfully");
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />

      <button onClick={updateProfile}>Update Profile</button>
    </div>
  );
}