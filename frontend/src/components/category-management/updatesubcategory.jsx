import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams
import Swal from 'sweetalert2';
import './updatesubcategory.css';

const UpdateSubcategory = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { id } = useParams(); // Get the ID from the URL parameter
  const [subcategory, setSubCategory] = useState({
    categoryID: '',
    subCategoryID: '',
    subCategoryName: '',
    date: '',
    subCategoryImage: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch subcategory data by ID on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/subcategory/${id}`)
      .then((response) => {
        setSubCategory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subcategory:', error);
        setErrorMessage('Failed to fetch subcategory data');
        setShowPopup(true);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategory((prevSubCategory) => ({
      ...prevSubCategory,
      [name]: value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  const handleFileChange = (e) => {
    setSubCategory({ ...subcategory, subCategoryImage: e.target.files[0] });
  };

  const validationFields = () => {
    let errors = {};

    for (const [key, value] of Object.entries(subcategory)) {
      if (!value) {
        errors[key] = 'This field is required.';
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const errors = validationFields();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append('categoryID', subcategory.categoryID);
      formData.append('subCategoryID', subcategory.subCategoryID);
      formData.append('subCategoryName', subcategory.subCategoryName);
      formData.append('date', subcategory.date);
      if (subcategory.subCategoryImage instanceof File) {
        formData.append('subCategoryImage', subcategory.subCategoryImage);
      } else {
        console.error('No valid file selected for subCategoryImage');
        return; // optionally stop the submission
      }

      axios
        .put(`http://localhost:3000/api/subCategory/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // Success popup with updated subcategory data
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `Sub-Category "${response.data.subCategoryName}" has been updated successfully!`,
            confirmButtonText: 'OK',
          });

          // Redirect to the subcategory list after successful update
          navigate('/subcategory-list');
        })
        .catch((error) => {
          setErrorMessage('Failed to update Sub-Category. Please try again.');
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 3000);
        });
    }
  };

  return (
    <div>
      <h1>Updating Sub-Category</h1>
      <div className="container">
        {showPopup && (
          <div
            style={{
              padding: '10px',
              backgroundColor: errorMessage ? '#f8d7da' : '#d4edda',
              color: errorMessage ? '#721c24' : '#155724',
              border: `1px solid ${errorMessage ? '#f5c6cb' : '#c3e6cb'}`,
              borderRadius: '5px',
              marginBottom: '20px',
            }}
          >
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="categoryID">Category ID</label>
          <input
            type="text"
            placeholder="Enter Category ID"
            name="categoryID"
            value={subcategory.categoryID}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="subCategoryID">Sub-Category ID</label>
          <input
            type="text"
            placeholder="Enter Sub-Category ID"
            name="subCategoryID"
            value={subcategory.subCategoryID}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="subCategoryName">Sub-Category Name</label>
          <input
            type="text"
            placeholder="Enter Sub-Category Name"
            name="subCategoryName"
            value={subcategory.subCategoryName}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="date">Create Date</label>
          <input
            type="date"
            name="date"
            value={subcategory.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="subCategoryImage">Sub-Category Image</label>
          <input
            type="file"
            name="subCategoryImage"
            onChange={handleFileChange}
            required
          />

          <button type="button" onClick={() => setSubCategory({
            categoryID: '',
            subCategoryID: '',
            subCategoryName: '',
            date: '',
            subCategoryImage: '',
          })}>
            CLEAR
          </button>
          <button type="submit">UPDATE</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubcategory;
