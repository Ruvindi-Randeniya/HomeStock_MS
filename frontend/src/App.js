import './App.css';
import Categoryoverview from './components/category-management/categoryoverview';
import './components/category-management/insertcategory'
import Insertcategory from './components/category-management/insertcategory';
import Insertsubcategory from './components/category-management/insertsubcategory';
import Sidebar from './components/category-management/sidebar';
import SubCategoryOverview from './components/category-management/subcategoryoverview';
import Updatecategory from './components/category-management/updatecategory';
import Updatesubcategory from './components/category-management/updatesubcategory';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flexGrow: 1, padding: '2rem' }}>
          <Routes>
            <Route path='/insertc' element={<Insertcategory />} />
            <Route path='/inserts' element={<Insertsubcategory />} />
            <Route path="/updatecategory/:id" element={<Updatecategory />} />
            <Route path='/overviewc' element={<Categoryoverview />} />
            <Route path='/overviews' element={<SubCategoryOverview />} />
            <Route path='/updatesubcategory/:id' element={<Updatesubcategory />} />
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
