import './App.css';
<<<<<<< HEAD
import AddItem from './components/item-management/pages/AddItem';
import Home from './components/item-management/pages/Home';
import ItemManagement from './components/item-management/pages/ItemManagement';
import EditItem from './components/item-management/pages/EditItem';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/item-management" element={<ItemManagement />} />
        <Route path="/edit-item/:id" element={<EditItem />} />
      </Routes>
=======
import Categoryoverview from './components/category-management/categoryoverview';
import './components/category-management/insertcategory'
import Insertcategory from './components/category-management/insertcategory';
import Insertsubcategory from './components/category-management/insertsubcategory';
import SubCategoryOverview from './components/category-management/subcategoryoverview';
import Updatecategory from './components/category-management/updatecategory';
import Updatesubcategory from './components/category-management/updatesubcategory';

function App() {
  return (
    <div>
          <Categoryoverview/>
>>>>>>> 22faca9a526892f6950c65fea5a564179f3b8aa8
    </div>
  );
}

export default App;
