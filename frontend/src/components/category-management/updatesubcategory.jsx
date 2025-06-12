import React, { useState, useEffect } from 'react';
import './updatecategory.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from './sidebar.jsx';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ Added useNavigate

const Updatesubcategory = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [formData, setFormData] = useState({
    categoryID: '',
    subCategoryID: "",
    subCategoryName: '',
    date: '',
    subCategoryImage: null,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/subcategory/${id}`)
        .then((res) => {
          setFormData({
            categoryID: res.data.categoryID,
            subCategoryID: res.data.subCategoryID,
            subCategoryName: res.data.subCategoryName,
            date: res.data.date,
            subCategoryImage: null,
          });
        })
        .catch((err) => console.error("Error fetching sub-category:", err));
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
    if (!formData.subCategoryID) errors.subCategoryID = 'Sub category ID is required.';
    if (!formData.subCategoryName) errors.subCategoryName = 'Sub Category Name is required.';
    if (!formData.date) errors.date = 'Date is required.';
    if (!formData.subCategoryImage) errors.subCategoryImage = 'Sub Category Image is required.';
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
      updateData.append('subCategoryID', formData.subCategoryID);
      updateData.append('subCategoryName', formData.subCategoryName);
      updateData.append('date', formData.date);
      if (formData.subCategoryImage instanceof File) {
        updateData.append('subCategoryImage', formData.subCategoryImage);
      }

      try {
        await axios.put(`http://localhost:3000/api/subcategory/${id}`, updateData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Sub-Category updated successfully!',
        }).then(() => {
          navigate('/subcategory-overview'); // ✅ Navigate after success popup
        });

        setFormData({
          categoryID: '',
          subCategoryID: '',
          subCategoryName: '',
          date: '',
          subCategoryImage: null,
        });
        setIsSubmitted(false);
        setValidationErrors({});
      } catch (error) {
        console.error('Error updating category:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating the sub-category.',
        });
      }
    }
  };

  return (
    <div className="main-layout"> {/* Flex container for layout */}
      <Sidebar /> {/* ✅ Sidebar called here */}

      <div className="update-category-content">
        <h1>Update Sub Category</h1>
         <div className='container'>

          <form onSubmit={handleSubmit}>
          <div >
          <label>Category ID</label>
          <input
            type="text"
            name="categoryID"
            value={formData.categoryID}
            onChange={handleChange}
            disabled
          />
        </div>
        <div >
          <label>Sub Category ID</label>
          <input
            type="text"
            name="sub categoryID"
            value={formData.subCategoryID}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <label>Sub Category Name</label>
          <input
            type="text"
            name="sub categoryname"
            value={formData.subCategoryName}
            onChange={handleChange}
          />
          {validationErrors.subCategoryName && <p className="error">{validationErrors.subCategoryName}</p>}
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
          <label>Sub Category Image</label>
          <input
            type="file"
            name="sub categoryImage"
            onChange={handleFileChange}
          />
          {validationErrors.subCategoryImage && <p className="error">{validationErrors.subCategoryImage}</p>}
        </div>
        <button type="submit" disabled={isSubmitted}>Update Category</button>
      
      </form>
        </div>
    </div>
    </div>
  );
};

export default Updatesubcategory;
