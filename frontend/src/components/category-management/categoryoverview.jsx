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

    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-800">Category Overview</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/add-category")}
          className="bg-yellow-700 hover:bg-yellow-800 text-white font-semibold py-2 px-4 rounded shadow"
        >
          + Add Category
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          placeholder="Search by Category ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm border border-gray-300">
            <thead className="bg-yellow-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Category ID</th>
                <th className="px-4 py-2 text-left">Category Name</th>
                <th className="px-4 py-2 text-left">Create Date</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category, index) => (
                <tr
                  key={category._id}
                  className={`border-t ${index % 2 === 0 ? 'bg-yellow-50' : 'bg-white'} hover:bg-yellow-100`}
                >
                  <td className="px-4 py-2">{category.categoryID}</td>
                  <td className="px-4 py-2">{category.categoryname}</td>
                  <td className="px-4 py-2">{category.date}</td>
                  <td className="px-4 py-2">
                    {category.categoryImage ? (
                      <div className="w-16 h-16 overflow-hidden rounded border border-gray-300">
                        <img
                          src={`http://localhost:3000/uploads/${category.categoryImage}`}
                          alt={category.categoryname || 'Category Image'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(category._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
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
    </div>
  );
};

export default Categoryoverview;
