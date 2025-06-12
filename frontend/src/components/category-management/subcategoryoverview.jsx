import React, { useEffect, useState } from "react";
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from "jspdf-autotable";
import './subcategoryoverview.css';
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Swal from 'sweetalert2';

const SubCategoryOverview = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/subcategory")
      .then((res) => {
        setSubCategories(res.data);
        setFilteredSubCategories(res.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Search filtering
  useEffect(() => {
    const filtered = subCategories.filter((subcategory) =>
      subcategory.subCategoryID.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubCategories(filtered);
  }, [searchTerm, subCategories]);

  // Handle Delete
  const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "This sub-category will be permanently deleted!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:3000/api/subcategory/${id}`)
        .then(() => {
          const updated = subCategories.filter((subcategory) => subcategory._id !== id);
          setSubCategories(updated);
          setFilteredSubCategories(updated);

          Swal.fire(
            'Deleted!',
            'The sub-category has been deleted.',
            'success'
          );
        })
        .catch((err) => {
          console.error("Error deleting category:", err);
          Swal.fire('Error', 'Something went wrong while deleting.', 'error');
        });
    } else {
      Swal.fire('Cancelled', 'The sub-category is safe 😊', 'info');
    }
  });
};

  // Generate PDF
  const generateReport = () => {
        try {
          const doc = new jsPDF();
    
          // Add title
          doc.setFontSize(16);
          doc.text('SubCategory Report', 14, 20);
    
          // Define table columns and rows
          const columns = ['Category ID', 'subCategory ID','Category Name', 'Category Image URL', 'Date'];
          const rows = filteredSubCategories.map((subCategory) => [
            subCategory.categoryID || 'N/A',
            subCategory.subCategoryID || 'N/A',
            subCategory.subCategoryName || 'N/A',
            subCategory.subCategoryImage || 'No Image',
            subCategory.date || 'N/A',
          ]);
    
          // Debug data
          console.log('Generating PDF with rows:', rows);
    
          // Generate table
          autoTable(doc, {
            startY: 30,
            head: [columns],
            body: rows,
            theme: 'striped', // Optional: improve table appearance
            margin: { top: 30 },
          });
    
          // Save the PDF
          doc.save('Subcategory_report.pdf');
        } catch (error) {
          console.error('Error generating PDF:', error);
          alert('Failed to generate PDF. Check the console for details.');
        }
      };
    
      const handleEdit = (id) => {
    navigate(`/update-subcategory/:id`);
  };
    
      return (
        <div className="main-layout"> {/* Flex container for layout */}
    <Sidebar /> {/* ✅ Sidebar called here */}

        <div className="overview-content">
          <h1 className="text">Sub-Category Overview</h1>
      
          <div>
              <button onClick={()=>navigate("/update-subcategory")} className="add-btn">
                + Add Sub-Category
              </button>
          </div>
      
          <div className="container">
            {/* 🔍 Search Input */}
            <input
              type="text"
              placeholder="Search by Sub-Category ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
      
            {/* 📊 Table */}
              <table className="table">
                <thead className="tr">
                  <tr>
                    <th className="th">Category ID</th>
                    <th className="th">Sub-Category ID</th>
                    <th className="th">Sub-Category Name</th>
                    <th className="th">Create Date</th>
                    <th className="th">Image</th>
                    <th className="th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubCategories.map((subcategory) => (
                    <tr key={subcategory._id} className="table-row">
                      <td className="th">{subcategory.categoryID}</td>
                      <td className="th">{subcategory.subCategoryID}</td>
                      <td className="th">{subcategory.subCategoryName}</td>
                      <td className="th">{new Date(subcategory.date).toLocaleDateString()}</td>
                  <td className="th">
                    <div className="image-box">
                      {subcategory.subCategoryImage ? (
                        <img
                          src={`http://localhost:3000/${subcategory.subCategoryImage}`}
                          alt={subcategory.subCategoryName}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                          onError={(e) => {
                            console.error(`Failed to load image: ${subcategory.subCategoryImage}`);
                            e.target.src = "https://via.placeholder.com/100?text=No+Image";
                          }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </div>
                  </td>
                      <td>
                        <div className="action-buttons">
                          <button
                        onClick={() =>  handleEdit(subcategory._id)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                          <button
                            onClick={() => handleDelete(subcategory._id)}
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
      
            {/* 📄 PDF Button */}
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

export default SubCategoryOverview;
