import './App.css';
import AddItem from './components/item-management/pages/AddItem';
import Home from './components/item-management/pages/Home';
import ItemManagement from './components/item-management/pages/ItemManagement';
import EditItem from './components/item-management/pages/EditItem';
import Categoryoverview from './components/category-management/categoryoverview';
import Insertcategory from './components/category-management/insertcategory';
import Insertsubcategory from './components/category-management/insertsubcategory';
import Sidebar from './components/category-management/sidebar';
import SubCategoryOverview from './components/category-management/subcategoryoverview';
import Updatecategory from './components/category-management/updatecategory';
import Updatesubcategory from './components/category-management/updatesubcategory';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flexGrow: 1, padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
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
        </div>
      </div>
    </Router>
  );
}

export default App;
