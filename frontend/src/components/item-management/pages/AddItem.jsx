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
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const resItems = await axios.get("http://localhost:3000/api/items");
        setExistingItems(resItems.data.data || []);

        const resCategories = await axios.get("http://localhost:3000/api/category");
        const categoryData = resCategories.data.data || resCategories.data || [];
        setCategories(categoryData);
        console.log("Categories:", categoryData); // Debug: Inspect categories

        const resSubCategories = await axios.get("http://localhost:3000/api/subcategory");
        const subCategoryData = resSubCategories.data.data || resSubCategories.data || [];
        setSubCategories(subCategoryData);
        console.log("SubCategories:", subCategoryData); // Debug: Inspect subcategories
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load categories or items.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Item Name is required";

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (!/^\d+(\.\d+)?(kg|g|L|ml|pcs|KG|G|L|ML|PCS)$/i.test(formData.quantity)) {
      newErrors.quantity = "Invalid format. Use numbers followed by kg, g, L, ml, pcs";
    }

    if (!formData.category) newErrors.category = "Category is required";

    if (!formData.subCategory) {
      newErrors.subCategory = "Sub Category is required";
    } else {
      // Verify subCategory is a valid ObjectId
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(formData.subCategory);
      if (!isValidObjectId) {
        newErrors.subCategory = "Invalid Sub Category selected";
      }
    }

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
    if (!validate()) {
      console.log("Validation errors:", errors); // Debug: Log validation errors
      return;
    }

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

    console.log("Submitting form data:", formData); // Debug: Log form data

    try {
      const response = await axios.post("http://localhost:3000/api/items", {
        name: formData.name,
        quantity: formData.quantity,
        category: formData.category,
        subCategory: formData.subCategory,
        expireDate: formData.expireDate,
      });
      console.log("Item added successfully:", response.data); // Debug: Log success
      alert("🎉 Item added successfully!");
      navigate("/item-management");
    } catch (error) {
      console.error("❌ Failed to add item:", error.response?.data || error.message);
      alert(`Failed to add item: ${error.response?.data?.error || "Unknown error"}`);
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
              placeholder="e.g., 2kg, 500g, 1.5L, 250ml, 10pcs"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  disabled={isLoading}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryname}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category}</p>
                )}
              </div>
              <div>
                <label className="block font-medium">Sub Category</label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  disabled={isLoading || subCategories.length === 0}
                >
                  <option value="">Select a sub-category</option>
                  {subCategories.length > 0 ? (
                    subCategories.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.subCategoryName}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No subcategories available
                    </option>
                  )}
                </select>
                {errors.subCategory && (
                  <p className="text-red-500 text-sm">{errors.subCategory}</p>
                )}
                {!isLoading && subCategories.length === 0 && (
                  <p className="text-yellow-500 text-sm">
                    No subcategories found. Please add subcategories first.
                  </p>
                )}
              </div>
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
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow"
                disabled={isLoading || subCategories.length === 0 || !formData.subCategory}
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