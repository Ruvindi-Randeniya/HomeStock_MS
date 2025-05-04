import React, { useState, useEffect } from 'react';
import './updatecategory.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from './sidebar.jsx';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ Added useNavigate

const Updatecategory = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [formData, setFormData] = useState({
    categoryID: '',
    categoryname: '',
    date: '',
    categoryImage: null,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/category/${id}`)
        .then((res) => {
          setFormData({
            categoryID: res.data.categoryID,
            categoryname: res.data.categoryname,
            date: res.data.date,
            categoryImage: null,
          });
        })
        .catch((err) => console.error("Error fetching category:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      categoryImage: e.target.files[0],
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!formData.categoryID) errors.categoryID = 'Category ID is required.';
    if (!formData.categoryname) errors.categoryname = 'Category Name is required.';
    if (!formData.date) errors.date = 'Date is required.';
    if (!formData.categoryImage) errors.categoryImage = 'Category Image is required.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const errors = validateFields();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      const updateData = new FormData();
      updateData.append('categoryID', formData.categoryID);
      updateData.append('categoryname', formData.categoryname);
      updateData.append('date', formData.date);
      if (formData.categoryImage instanceof File) {
        updateData.append('categoryImage', formData.categoryImage);
      }

      try {
        await axios.put(`http://localhost:3000/api/category/${id}`, updateData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Category updated successfully!',
        }).then(() => {
          navigate('/category-overview'); // ✅ Navigate after success popup
        });

        setFormData({
          categoryID: '',
          categoryname: '',
          date: '',
          categoryImage: null,
        });
        setIsSubmitted(false);
        setValidationErrors({});
      } catch (error) {
        console.error('Error updating category:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating the category.',
        });
      }
    }
  };

  return (
    <div className="main-layout"> {/* Flex container for layout */}
      <Sidebar /> {/* ✅ Sidebar called here */}
    <div className="update-category-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Update Category</h2>
        <div>
          <label>Category ID</label>
          <input
            type="text"
            name="categoryID"
            value={formData.categoryID}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <label>Category Name</label>
          <input
            type="text"
            name="categoryname"
            value={formData.categoryname}
            onChange={handleChange}
          />
          {validationErrors.categoryname && <p className="error">{validationErrors.categoryname}</p>}
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {validationErrors.date && <p className="error">{validationErrors.date}</p>}
        </div>
        <div>
          <label>Category Image</label>
          <input
            type="file"
            name="categoryImage"
            onChange={handleFileChange}
          />
          {validationErrors.categoryImage && <p className="error">{validationErrors.categoryImage}</p>}
        </div>
        <button type="submit" disabled={isSubmitted}>Update Category</button>
      </form>
    </div>
    </div>
  );
};

export default Updatecategory;
