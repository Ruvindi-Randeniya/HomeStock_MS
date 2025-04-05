import React, {useEffect,useState } from "react";
import axios from 'axios'
import "./subcategoryoverview.css";
import {jsPDF} from 'jspdf'
import "jspdf-autotable"
import './subcategoryoverview.css'

const SubCategoryOverview = () => {
  const [subCategories, setSubCategories] = useState([]);

    // Fetch categories from API
    useEffect(() => {
      axios
        .get("http://localhost:3000/api/subcategory") // Update API endpoint accordingly
        .then((res) => setSubCategories(res.data))
        .catch((err) => console.error("Error fetching data:", err));
    }, []);
  
    // Handle Delete
    const handleDelete = (id) => {
      axios
        .delete(`http://localhost:3000/api/subcategory/${id}`)
        .then(() => {
          setSubCategories(subCategories.filter((subcategory) => subcategory._id !== id));
        })
        .catch((err) => console.error("Error Sub-deleting category:", err));
    };
  
    // Generate PDF
    const generatePDF = () => {
      const doc = new jsPDF();
      doc.text("Sub-Category Overview Report", 20, 10);
  
      const tableColumn = ["Sub-Category ID", "SUb-Category Name", "Create Date"];
      const tableRows = [];
  
      subCategories.forEach((subcategory) => {
        const rowData = [subcategory.subCategoryID, subcategory.subCategoryName, subcategory.data];
        tableRows.push(rowData);
      });
  
      doc.autoTable(tableColumn, tableRows, { startY: 20 });
      doc.save("Category_Overview.pdf");
    };

  return (
    <div>
    <h1 className="text">Sub-Category Overview</h1>
    <button type='btn'>+ Add Sub-Category</button>
<div className="container">

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
    {subCategories.map((subcategory) => (
      <tr key={subcategory._id} className="border">
        <td className="th">{subcategory.categoryID}</td>
        <td className="th">{subcategory.subCategoryID}</td>
        <td className="th">{subcategory.subCategoryName}</td>
        <td className="th">{subcategory.date}</td>
        <td className="th">
          <img src={subcategory.image} alt='category' className="image" />
        </td>
        <td className="th">
          <button type='edit' >Edit</button>
          <button type='delete' onClick={() => handleDelete(subcategory._id)}>Delete</button>
        </td>
      </tr>
      ))}
  </tbody>
</table>
<button type='pdf' onClick={generatePDF}>Generate PDF</button>
</div>
</div>
)
};

export default SubCategoryOverview
