import React, {useState,useEffect} from 'react'
import axios from 'axios'
import 'jspdf-autotable';
import './categoryoverview.css'
import { Link } from 'react-router-dom';
const LetterHead = "../../../src/images/category-management/logo.png";

const Categoryoverview = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    // Fetch categories from API
    useEffect(() =>{
      axios
      .get('http://localhost:3000/api/category')
      .then((res) => {
        setCategories(res.data);
        setFilteredCategories(res.data);
      })
      .catch((err) => console.error("Error fetching data:",err))
    }, [])
  
     //search filtering
     useEffect(() => {
      const filtered = categories.filter((category) =>
        category.categoryID?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    }, [searchTerm, categories]);
    

    // Handle Delete
    const handleDelete = (id) => {
      axios
        .delete(`http://localhost:3000/api/category/${id}`)
        .then(() => {
          setCategories(categories.filter((category) => category._id !== id));
        })
        .catch((err) => console.error("Error deleting category:", err));
    };

    const generateReport = () => {
      const doc = new jsPDF();
      const image = new Image();
      image.src = LetterHead;
    
      // Wait for the image to load
      image.onload = () => {
        doc.addImage(image, 'PNG', 10, 10, 190, 40); // Adjust height as needed
        doc.setFontSize(16);
        doc.text('Category Report', 14, 60);
    
        const columns = ['Category ID', 'Category Name', 'Category Image URL', 'Date'];
        const rows = filteredCategories.map((category) => [
          category.categoryID,
          category.categoryName,
          category.categoryImage,
          category.date,
        ]);
    
        doc.autoTable({
          startY: 70,
          head: [columns],
          body: rows,
        });
    
        doc.save('category_report.pdf');
      };
    
      image.onerror = () => {
        console.error("Failed to load the image.");
        alert("Could not load the letterhead image. Check the path or file.");
      };
    };
    
  
  return (
    <div>
        <h1 className="text">Category Overview</h1>
        <Link to={`/insertc`}>
        <button className='add-btn'>+ Add Category</button></Link>
    <div className="container">
    {/* search Input*/}
    <input type='text' placeholder='Search by Category ID...'
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className='search-input'/>

    <table className="table">
      <thead>
        <tr className="tr">
          <th className="th">Category ID</th>
          <th className="th">Category Name</th>
          <th className="th">Create Date</th>
          <th className="th">Category Image</th>
          <th className="th">Actions</th>
        </tr>
      </thead>
      <tbody>
      {filteredCategories.map((category) => (
          <tr key={category._id} className="table-row">
            <td className="th">{category.categoryID}</td>
            <td className="th">{category.categoryName}</td>
            <td className="th">{category.date}</td>
            <td className="th">
            <div className="image-box">
                    <img src={category.image} alt={category.name} />
                  </div>
            </td>
            <td className="th">
            <div className="action-buttons">
            <Link to={`/updatecategory/${category._id}`}>
            <button className='edit-btn'>Edit</button></Link>
              <button className='delete-btn' onClick={() => handleDelete(category._id)}>Delete</button>
              </div>
            </td>
          </tr>
          ))}
      </tbody>
    </table>
    <div className="pdf-button-container">
    <button className='pdf-button' onClick={generateReport}>Generate PDF</button>
    </div>
  </div>
  </div>
  )
}

export default Categoryoverview
