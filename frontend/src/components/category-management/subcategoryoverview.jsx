import React, { useEffect, useState } from "react";
import axios from 'axios';
import { jsPDF } from 'jspdf';
import "jspdf-autotable";
import './subcategoryoverview.css';

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
      <button type='btn'>+ Add Sub-Category</button>

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
              <tr key={subcategory._id} className="border">
                <td className="th">{subcategory.categoryID}</td>
                <td className="th">{subcategory.subCategoryID}</td>
                <td className="th">{subcategory.subCategoryName}</td>
                <td className="th">{subcategory.date}</td>
                <td className="th">
                  <img src={subcategory.image} alt='subcategory' className="image" />
                </td>
                <td className="th">
                  <button type='edit'>Edit</button>
                  <button type='delete' onClick={() => handleDelete(subcategory._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 📄 PDF Button */}
        <button type='pdf' onClick={generatePDF}>Generate PDF</button>
      </div>
    </div>
  );
};

export default SubCategoryOverview;
