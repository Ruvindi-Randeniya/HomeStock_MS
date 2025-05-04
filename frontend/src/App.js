import "./App.css";
import Login from "./components/user-management/Login";
import AddNewUser from "./components/user-management/AddNewUser";
import AdminDashboard from "./components/user-management/AdminDashboard";
import UserProfile from "./components/user-management/userProfile";
import UpdateUser from "./components/user-management/UpdateUser";

import AddItem from './Components/item-management/pages/AddItem';
import Home from './Components/item-management/pages/Home';
import ItemManagement from './Components/item-management/pages/ItemManagement';
import EditItem from './Components/item-management/pages/EditItem';
import Categoryoverview from './Components/category-management/categoryoverview';
import Insertcategory from './Components/category-management/insertcategory';
import Insertsubcategory from './Components/category-management/insertsubcategory';
import SubCategoryOverview from './Components/category-management/subcategoryoverview';

import Updatesubcategory from './Components/category-management/updatesubcategory';
import { Routes, Route } from 'react-router-dom';  // Import Routes and Route here

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/add-new-user" element={<AddNewUser />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/admin/update-user/:id" element={<UpdateUser />} />
      <Route path="/home" element={<Home />} />
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/item-management" element={<ItemManagement />} />
      <Route path="/edit-item/:id" element={<EditItem />} />
      <Route path="/category-overview" element={<Categoryoverview />} />
      <Route path="/insert-category" element={<Insertcategory />} />
      <Route path="/insert-subcategory" element={<Insertsubcategory />} />
      <Route path="/subcategory-overview" element={<SubCategoryOverview />} />
      <Route path="/update-category/:id" element={<Updatecategory />} />
      <Route path="/update-subcategory/:id" element={<Updatesubcategory />} />
    </Routes>
  );
}

export default App;
