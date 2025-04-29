import React, { useState } from 'react'
import './insertcategory.css'
import axios from 'axios'

const Insertcategory = () => {

  const [formData, setFormData] = useState({
    categoryID: "",
    categoryname: "",
    date: "",
    categoryImage: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, categoryImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("categoryID", formData.categoryID);
      data.append("categoryname", formData.categoryname);
      data.append("date", formData.date);
      data.append("categoryImage", formData.categoryImage);

      await axios.post("http://localhost:3000/api/category", data);
      alert("Category added successfully");
    } catch (error) {
      alert("Category addition failed");
    }
  };

  return (
    <div>
    <h1>ADDING CATEGORIES</h1>
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='categoryID'> Category ID</label> 
        <input type='text' placeholder='Enter Category ID' name='categoryID' value={formData.categoryID} onChange={handleChange} required /> <br/>

        <label htmlFor='categoryName'> Category Name</label>
        <input type='text' placeholder='Enter Category Name' name='categoryname' value={formData.categoryname} onChange={handleChange} required/><br/>

        <label htmlFor='date'> Create Date</label>
        <input type='date' name='date' value={formData.date} onChange={handleChange} required/><br/>

        <label htmlFor='categoryimage'> Category Image</label>
        <input type='file' placeholder='Select Image' name='categoryImage'onChange={handleFileChange} required/><br/>

        <button type='clear'onClick={() => setFormData({ categoryID: "", categoryname: "", categoryImage: "", date: ""})} >CLEAR</button>
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
    </div>
  )
}

export default Insertcategory
