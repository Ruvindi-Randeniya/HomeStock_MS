import "./App.css";
import Login from "./Components/user-management/Login";
import AddNewUser from "./Components/user-management/AddNewUser";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./Components/user-management/AdminDashboard";
import UserProfile from "./Components/user-management/userProfile";
import UpdateUser from "./Components/UpdateUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/add-new-user" element={<AddNewUser />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/admin/update-user/:id" element={<UpdateUser />} />
      
    </Routes>
  );
}

export default App;
