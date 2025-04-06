import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../data-files/sideBar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png"; // Import the logo directly

const ItemTable = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch items from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/items")
      .then((response) => {
        console.log("API Response:", response.data.data);
        setItems(response.data.data);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  // Delete item
  const deleteItem = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:3000/api/items/${id}`)
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  // Handle search filtering
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.subCategory.toLowerCase().includes(term)
    );
  });

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = logo;

    img.onload = () => {
      doc.addImage(img, "PNG", 14, 10, 40, 40);
      doc.text("Added Items", 14, 55);

      const dataToExport = searchTerm.trim() === "" ? items : filteredItems;

      autoTable(doc, {
        startY: 60,
        head: [
          ["Item Name", "Quantity", "Category", "Sub Category", "Expire Date"],
        ],
        body: dataToExport.map((item) => [
          item.name,
          item.quantity,
          item.category,
          item.subCategory,
          new Date(item.expireDate).toLocaleDateString(),
        ]),
      });

      doc.save("items-report.pdf");
    };
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="container mx-auto p-4 overflow-auto">
        {/* Top Actions */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
          <button
            onClick={() => navigate("/add-item")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow"
          >
            + Add Item
          </button>
          <input
            type="text"
            placeholder="Search by name, category or subcategory..."
            value={searchTerm}
            onChange={handleSearch}
            className="border px-3 py-2 rounded shadow"
          />
          <button
            onClick={generatePDF}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            Export PDF
          </button>
        </div>

        {/* Item Table */}
        <table className="w-full border-collapse border border-gray-300 shadow-lg rounded">
          <thead className="bg-yellow-500 text-white">
            <tr>
              <th className="p-2 border border-gray-300">Item Name</th>
              <th className="p-2 border border-gray-300">Quantity</th>
              <th className="p-2 border border-gray-300">Category</th>
              <th className="p-2 border border-gray-300">Sub Category</th>
              <th className="p-2 border border-gray-300">Expire Date</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr
                key={item._id}
                className="border border-gray-300 hover:bg-yellow-50 transition"
              >
                <td className="p-2 border border-gray-300">{item.name}</td>
                <td className="p-2 border border-gray-300">{item.quantity}</td>
                <td className="p-2 border border-gray-300">{item.category}</td>
                <td className="p-2 border border-gray-300">{item.subCategory}</td>
                <td className="p-2 border border-gray-300">
                  {new Date(item.expireDate).toLocaleDateString()}
                </td>
                <td className="p-2 border border-gray-300 space-x-2">
                  <button
                    onClick={() => navigate(`/edit-item/${item._id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemTable;
