import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './categoryoverview.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar.jsx';


const Categoryoverview = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/category/${id}`)
      .then(() => {
        setCategories(categories.filter((category) => category._id !== id));
      })
      .catch((err) => console.error("Error deleting category:", err));
  };

  const filteredCategories = categories.filter((cat) =>
    cat.categoryID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Category Overview Report", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Category ID", "Category Name", "Create Date"]],
      body: filteredCategories.map((cat) => [
        cat.categoryID,
        cat.categoryname,
        cat.date,
      ]),
    });
    doc.save("category_overview.pdf");
  };

  const handleEdit = (id) => {
    navigate(`/update-category/${id}`);
  };

  return (
    <div className="main-layout"> {/* Flex container for layout */}
    <Sidebar /> {/* ✅ Sidebar called here */}

    <div className='overview-content'>
      <h1 className="text">Category Overview</h1>

      <div>
        <button
          onClick={() => navigate("/add-category")}
          className="add-btn"
        >
          + Add Category
        </button>
      </div>

      <div className="container">
        <input
          type="text"
          placeholder="Search by Category ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        
          <table className="table">
            <thead >
              <tr className='tr'>
                <th className="th">Category ID</th>
                <th className="th">Category Name</th>
                <th className="th">Create Date</th>
                <th className="th">Image</th>
                <th className="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category, index) => (
                <tr
                  key={category._id}
                  className='table-row'
                >
                  <td className="th">{category.categoryID}</td>
                  <td className="th">{category.categoryname}</td>
                  <td className="th">{category.date}</td>
                  <td className="th">
                    {category.categoryImage ? (
                      <div className="image-box">
                        <img
                          src={`http://localhost:3000/uploads/${category.categoryImage}`}
                          alt={category.categoryname || 'Category Image'}
                        />
                      </div>
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td>
                    <div className='action-buttons'>
                      <button
                        onClick={() => handleEdit(category._id)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pdf-button-container">
          <button
            onClick={generateReport}
            className="pdf-button"
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
   
  );
};

export default Categoryoverview;
