import React, { useEffect, useState } from 'react';
import './insertcategory.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from './sidebar.jsx';

const Insertcategory = () => {
  const [category, setCategory] = useState({
    categoryID: '',
    categoryname: '',
    date: '',
    categoryImage: null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const generateCategoryID = () => {
    return Math.floor(Math.random() * 100000).toString();
  };

  useEffect(() => {
    const newCategoryID = generateCategoryID();
    setCategory((prevCategory) => ({
      ...prevCategory,
      categoryID: newCategoryID,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
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
    const file = e.target.files[0];
    setCategory((prevCategory) => ({
      ...prevCategory,
      categoryImage: file,
    }));

    if (validationErrors.categoryImage) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        categoryImage: null,
      }));
    }
  };

  const validateFields = () => {
    let errors = {};
    if (!category.categoryID) errors.categoryID = 'Category ID is required.';
    if (!category.categoryname) errors.categoryname = 'Category Name is required.';
    if (!category.date) errors.date = 'Date is required.';
    if (!category.categoryImage) errors.categoryImage = 'Category Image is required.';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const errors = validateFields();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append('categoryID', category.categoryID);
      formData.append('categoryname', category.categoryname);
      formData.append('date', category.date);
      if (category.categoryImage instanceof File) {
        formData.append('categoryImage', category.categoryImage);
      } else {
        setErrorMessage('No valid file selected for category image.');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        return;
      }

      axios
        .post('http://localhost:3000/api/category', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(() => {
          setCategory({
            categoryID: generateCategoryID(),
            categoryname: '',
            date: '',
            categoryImage: null,
          });

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Category added successfully!',
            confirmButtonText: 'OK',
          });
        })
        .catch((error) => {
          console.error('Error adding category:', error);
          setErrorMessage('Failed to add category. Please try again.');
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 3000);
        });
    }
  };

  const handleClear = () => {
    setCategory({
      categoryID: generateCategoryID(),
      categoryname: '',
      date: '',
      categoryImage: null,
    });
    setValidationErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="main-layout"> {/* Flex container for layout */}
      <Sidebar /> {/* ✅ Sidebar called here */}

      <div className="insert-category-content">
        <h1>Adding Categories</h1>
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
              value={category.categoryID}
              onChange={handleChange}
              readOnly
            />
            {validationErrors.categoryID && isSubmitted && (
              <span className="error">{validationErrors.categoryID}</span>
            )}
            <br />

            <label htmlFor="categoryname">Category Name</label>
            <input
              type="text"
              placeholder="Enter Category Name"
              name="categoryname"
              value={category.categoryname}
              onChange={handleChange}
            />
            {validationErrors.categoryname && isSubmitted && (
              <span className="error">{validationErrors.categoryname}</span>
            )}
            <br />

            <label htmlFor="date">Create Date</label>
            <input
              type="date"
              name="date"
              value={category.date}
              onChange={handleChange}
            />
            {validationErrors.date && isSubmitted && (
              <span className="error">{validationErrors.date}</span>
            )}
            <br />

            <label htmlFor="categoryImage">Category Image</label>
            <input
              type="file"
              name="categoryImage"
              onChange={handleFileChange}
            />
            {validationErrors.categoryImage && isSubmitted && (
              <span className="error">{validationErrors.categoryImage}</span>
            )}
            <br />

            <button type="button" onClick={handleClear}>CLEAR</button>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Insertcategory;
