import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './categoryoverview.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar.jsx';
import Swal from 'sweetalert2';

const Categoryoverview = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/category")
      .then((res) => {
        setCategories(res.data);
        setFilteredCategories(res.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);


  //delete
  const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "This category will be permanently deleted!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:3000/api/category/${id}`)
        .then(() => {
          const updated = categories.filter((category) => category._id !== id);
          setCategories(updated);
          setFilteredCategories(updated);

          Swal.fire(
            'Deleted!',
            'The category has been deleted.',
            'success'
          );
        })
        .catch((err) => {
          console.error("Error deleting category:", err);
          Swal.fire('Error', 'Something went wrong while deleting.', 'error');
        });
    } else {
      Swal.fire('Cancelled', 'The category is safe 😊', 'info');
    }
  });
};
// Search filtering
  useEffect(() => {
    const filtered = categories.filter((cat) =>
      cat.categoryID.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

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
          onClick={() => navigate("/insert-category")}
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
                  <td className="th">{new Date(category.date).toLocaleDateString()}</td>
                  <td className="th">
                    <div className="image-box">
                      {category.categoryImage ? (
                        <img
                          src={`http://localhost:3000/${category.categoryImage}`}
                          alt={category.categoryName}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                          onError={(e) => {
                            console.error(`Failed to load image: ${category.categoryImage}`);
                            e.target.src = "https://via.placeholder.com/100?text=No+Image";
                          }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </div>
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
