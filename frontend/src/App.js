import './App.css';
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
    </div>
  );
}

export default App;
