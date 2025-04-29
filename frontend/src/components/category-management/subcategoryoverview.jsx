import React, { useEffect, useState } from "react";
import axios from 'axios';
import { jsPDF } from 'jspdf';
import "jspdf-autotable";
import './subcategoryoverview.css';
import { Link } from "react-router-dom";

const SubCategoryOverview = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

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
    axios
      .delete(`http://localhost:3000/api/subcategory/${id}`)
      .then(() => {
        const updated = subCategories.filter((subcategory) => subcategory._id !== id);
        setSubCategories(updated);
        setFilteredSubCategories(updated);
      })
      .catch((err) => console.error("Error Sub-deleting category:", err));
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Sub-Category Overview Report", 20, 10);

    const tableColumn = ["Sub-Category ID", "Sub-Category Name", "Create Date"];
    const tableRows = [];

    filteredSubCategories.forEach((subcategory) => {
      const rowData = [
        subcategory.subCategoryID,
        subcategory.subCategoryName,
        subcategory.date,
      ];
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("SubCategory_Overview.pdf");
  };

  return (
    <div>
      <h1 className="text">Sub-Category Overview</h1>
      <Link to={`/inserts`}>
      <button className="add-btn">+ Add Sub-Category</button> </Link>

      <div className="container">
        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search by Sub-Category ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <table className="table">
          <thead>
            <tr className="tr">
              <th className="th">Category ID</th>
              <th className="th">Sub-Category ID</th>
              <th className="th">Sub-Category Name</th>
              <th className="th">Create Date</th>
              <th className="th">Sub-Category Image</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubCategories.map((subcategory) => (
              <tr key={subcategory._id} className="table row">
                <td className="th">{subcategory.categoryID}</td>
                <td className="th">{subcategory.subCategoryID}</td>
                <td className="th">{subcategory.subCategoryName}</td>
                <td className="th">{subcategory.date}</td>
                <td className="th">
                <div className="image-box">
                  <img src={subcategory.image} alt='subcategory' className="image" />
               </div>
                </td>
                <td className="th">
                <div className="action-buttons">
                  <Link to={`/updatesubcategory/${subcategory._id}`}>
                              <button className="edit-btn">Edit</button></Link>
                  <button className="delete-btn" onClick={() => handleDelete(subcategory._id)}>Delete</button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 📄 PDF Button */}
        <div className="pdf-button-container">
        <button className="pdf-btn" onClick={generatePDF}>Generate PDF</button>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryOverview;
