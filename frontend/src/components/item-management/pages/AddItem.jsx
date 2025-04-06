import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../data-files/sideBar";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    category: "",
    subCategory: "",
    expireDate: "",
  });

  const [errors, setErrors] = useState({});
  const [existingItems, setExistingItems] = useState([]);

  // Fetch existing items on load
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/items");
        // Safely extract items array
        const items = Array.isArray(res.data)
          ? res.data
          : res.data.items || [];

        setExistingItems(items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Item Name is required";

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (!/^\d+(\.\d+)?(kg|g|L|ml)$/i.test(formData.quantity)) {
      newErrors.quantity =
        "Invalid format. Use numbers followed by kg, g, L, or ml";
    }

    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.subCategory.trim())
      newErrors.subCategory = "Sub Category is required";

    if (!formData.expireDate) {
      newErrors.expireDate = "Expire Date is required";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.expireDate);
      if (selectedDate <= today) {
        newErrors.expireDate = "Expire Date must be a future date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Check if item with the same name already exists
    const existingItem = existingItems.find(
      (item) =>
        item.name.trim().toLowerCase() === formData.name.trim().toLowerCase()
    );

    if (existingItem) {
      const confirmEdit = window.confirm(
        "🚨 This item is already added to the list!\n\nWould you like to edit its quantity instead?"
      );
      if (confirmEdit) {
        navigate(`/edit-item/${existingItem._id}`);
      }
      return;
    }

    try {
      const payload = {
        name: formData.name,
        quantity: formData.quantity,
        category: formData.category,
        subCategory: formData.subCategory,
        expireDate: formData.expireDate,
      };

      await axios.post("http://localhost:3000/api/items", payload);
      alert("🎉 Item added successfully!");
      navigate("/item-management");
    } catch (error) {
      console.error("❌ Failed to add item:", error);
      alert("Something went wrong while submitting!");
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      quantity: "",
      category: "",
      subCategory: "",
      expireDate: "",
    });
    setErrors({});
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-3xl text-center my-4 font-bold">Add New Item</h2>
        <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Item Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Enter item name"
            />
            <InputField
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              error={errors.quantity}
              placeholder="e.g., 2kg, 500g, 1.5L, 250ml"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                error={errors.category}
                placeholder="Enter category"
              />
              <InputField
                label="Sub Category"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                error={errors.subCategory}
                placeholder="Enter sub-category"
              />
            </div>
            <div>
              <label className="block font-medium">Expire Date</label>
              <input
                type="date"
                name="expireDate"
                value={formData.expireDate}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.expireDate && (
                <p className="text-red-500 text-sm">{errors.expireDate}</p>
              )}
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded shadow"
              >
                Done
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-gray-400 text-black font-semibold px-4 py-2 rounded shadow"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, error, placeholder }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default AddItem;
