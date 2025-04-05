import "./App.css";
import Login from "./Components/user-management/Login";
import AddNewUser from "./Components/user-management/AddNewUser";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./Components/user-management/AdminDashboard";
import UserProfile from "./Components/user-management/userProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/add-new-user" element={<AddNewUser />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/user-profile" element={<UserProfile />} />
      
    </Routes>
  );
}

export default App;
