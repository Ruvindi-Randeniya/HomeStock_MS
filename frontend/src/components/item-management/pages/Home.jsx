import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../data-files/sideBar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/items")
      .then((res) => {
        const itemList = res.data.data || [];
        setItems(itemList);

        const uniqueCategories = [
          ...new Map(
            itemList
              .filter((item) => item.category?._id)
              .map((item) => [item.category._id, item.category])
          ).values(),
        ];
        setCategoryOptions(uniqueCategories);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category?._id === selectedCategory)
    : items;

  const totalCategories = new Set(
    items.map((item) => item.category?._id).filter(Boolean)
  ).size;

  const totalSubCategories = new Set(
    items.map((item) => item.subCategory?._id).filter(Boolean)
  ).size;

  // Prepare data for the bar chart
  const categoryCounts = categoryOptions.map((cat) => ({
    name: cat.categoryname,
    count: items.filter((item) => item.category?._id === cat._id).length,
  }));

  // Define color palette
  const barColors = [
    "#facc15", // yellow
    "#f97316", // orange
    "#4ade80", // green
    "#60a5fa", // blue
    "#a78bfa", // purple
    "#f87171", // red
    "#34d399", // teal
    "#fb923c", // deep orange
    "#c084fc", // violet
    "#f472b6", // pink
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-gray-700">Total Items</h2>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{items.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-gray-700">Total Categories</h2>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{totalCategories}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-gray-700">Total Subcategories</h2>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{totalSubCategories}</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Items by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" name="Item Count">
                {categoryCounts.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={barColors[index % barColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-700 font-medium">Filter by Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded shadow w-full sm:w-64"
          >
            <option value="">All Categories</option>
            {categoryOptions.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryname}
              </option>
            ))}
          </select>
        </div>

        {/* Item Grid */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-yellow-500 text-white">
              <tr>
                <th className="p-3 border border-gray-300">Item Name</th>
                <th className="p-3 border border-gray-300">Quantity</th>
                <th className="p-3 border border-gray-300">Category</th>
                <th className="p-3 border border-gray-300">Sub Category</th>
                <th className="p-3 border border-gray-300">Expire Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-yellow-50 transition-colors border-b"
                >
                  <td className="p-3 border border-gray-300">{item.name}</td>
                  <td className="p-3 border border-gray-300">{item.quantity}</td>
                  <td className="p-3 border border-gray-300">
                    {item.category?.categoryname || "N/A"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {item.subCategory?.subCategoryName || "N/A"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {new Date(item.expireDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No items found for the selected category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
