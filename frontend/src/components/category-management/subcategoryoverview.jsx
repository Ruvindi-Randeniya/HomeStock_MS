import React, { useEffect, useState } from "react";
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from "jspdf-autotable";
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
    
    
      return (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">Sub-Category Overview</h1>
      
          <div className="flex justify-end mb-4">
            <Link to={`/inserts`}>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow">
                + Add Sub-Category
              </button>
            </Link>
          </div>
      
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* 🔍 Search Input */}
            <input
              type="text"
              placeholder="Search by Sub-Category ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
      
            {/* 📊 Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm border border-gray-200">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Category ID</th>
                    <th className="px-4 py-2 text-left">Sub-Category ID</th>
                    <th className="px-4 py-2 text-left">Sub-Category Name</th>
                    <th className="px-4 py-2 text-left">Create Date</th>
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubCategories.map((subcategory) => (
                    <tr key={subcategory._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{subcategory.categoryID}</td>
                      <td className="px-4 py-2">{subcategory.subCategoryID}</td>
                      <td className="px-4 py-2">{subcategory.subCategoryName}</td>
                      <td className="px-4 py-2">{subcategory.date}</td>
                      <td className="px-4 py-2">
                        <div className="w-16 h-16 overflow-hidden rounded border border-gray-300">
                        <img
  src={subcategory.subCategoryImage}
  alt="subcategory"
  className="w-full h-full object-cover"
/>

                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                          <Link to={`/updatesubcategory/${subcategory._id}`}>
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(subcategory._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
            <div className="mt-6 flex justify-end">
              <button
                onClick={generateReport}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
              >
                Generate PDF
              </button>
            </div>
          </div>
        </div>
      );
      
};

export default SubCategoryOverview;
