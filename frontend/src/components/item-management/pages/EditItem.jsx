import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../data-files/sideBar";
import { useNavigate, useParams } from "react-router-dom";

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    category: "",
    subCategory: "",
    expireDate: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/items/${id}`);
        const item = response.data;
        setFormData({
          name: item.name || "",
          quantity: item.quantity || "",
          category: item.category || "",
          subCategory: item.subCategory || "",
          expireDate: item.expireDate ? item.expireDate.split("T")[0] : "",
        });
      } catch (error) {
        console.error("Failed to fetch item:", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (formData.quantity && !/^\d+(\.\d+)?(kg|g|L|ml|pcs)$/i.test(formData.quantity)) {
      newErrors.quantity = "Use format like 2kg, 1.5L, etc.";
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
    if (!validate()) return;

    const payload = {
      quantity: formData.quantity,
      expireDate: formData.expireDate,
    };

    try {
      await axios.put(`http://localhost:3000/api/items/${id}`, payload);
      alert("Item successfully updated");
      navigate("/item-management");
    } catch (error) {
      console.error("Failed to update item:", error);
      alert("Something went wrong while updating!");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-3xl text-center my-4 font-bold">Edit Item</h2>
        <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* View-only Fields */}
            <ReadOnlyField label="Item Name" value={formData.name} />
            <ReadOnlyField label="Category" value={formData.category} />
            <ReadOnlyField label="Sub Category" value={formData.subCategory} />

            {/* Editable Fields */}
            <InputField
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              error={errors.quantity}
              placeholder="e.g., 2kg, 500g"
            />

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

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded shadow"
              >
                Update
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

const ReadOnlyField = ({ label, value }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <input
      type="text"
      value={value}
      disabled
      className="w-full p-2 border bg-gray-100 text-gray-700 rounded"
    />
  </div>
);

export default EditItem;
