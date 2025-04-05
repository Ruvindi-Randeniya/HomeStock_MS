import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {jsPDF} from 'jspdf'
import "jspdf-autotable"
import './categoryoverview.css'

const Categoryoverview = () => {

    const [categories, setCategories] = useState([]);

    // Fetch categories from API
    useEffect(() => {
      axios
        .get("http://localhost:3000/api/categories") // Update API endpoint accordingly
        .then((res) => setCategories(res.data))
        .catch((err) => console.error("Error fetching data:", err));
    }, []);
  
    // Handle Delete
    const handleDelete = (id) => {
      axios
        .delete(`http://localhost:3000/api/categories/${id}`)
        .then(() => {
          setCategories(categories.filter((category) => category._id !== id));
        })
        .catch((err) => console.error("Error deleting category:", err));
    };
  
    // Generate PDF
    const generatePDF = () => {
      const doc = new jsPDF();
      doc.text("Category Overview Report", 20, 10);
  
      const tableColumn = ["Category ID", "Category Name", "Create Date"];
      const tableRows = [];
  
      categories.forEach((category) => {
        const rowData = [category.categoryID, category.categoryName, category.date];
        tableRows.push(rowData);
      });
  
      doc.autoTable(tableColumn, tableRows, { startY: 20 });
      doc.save("Category_Overview.pdf");
    };

  return (
    <div>
        <h1 className="text">Category Overview</h1>
        <button type='btn'>+ Add Category</button>
    <div className="container">
    
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
        {categories.map((category) => (
          <tr key={category._id} className="border">
            <td className="th">{category.categoryID}</td>
            <td className="th">{category.categoryName}</td>
            <td className="th">{category.date}</td>
            <td className="th">
              <img src={category.image} alt='category' className="image" />
            </td>
            <td className="th">
              <button type='edit' >Edit</button>
              <button type='delete' onClick={() => handleDelete(category._id)}>Delete</button>
            </td>
          </tr>
          ))}
      </tbody>
    </table>
    <button type='pdf' onClick={generatePDF}>Generate PDF</button>
  </div>
  </div>
  )
}

export default Categoryoverview
