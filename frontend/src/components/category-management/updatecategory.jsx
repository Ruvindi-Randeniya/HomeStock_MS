import React, { useEffect, useState } from 'react'
import './updatecategory.css'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';

const Updatecategory = () => {
 const [formData, setFormData] = useState({
    categoryID: "",
    categoryname: "",
    date: "",
    categoryImage: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, categoryImage: e.target.files[0] });
  };

  useEffect(() =>{
    axios
    .get(`http://localhost:3000/api/category/${id}`)
    .then((res) =>{
      setFormData({
        categoryID: res.data.categoryID,
        categoryname: res.data.categoryname,
        categoryImage: res.data.categoryImage,
        date: res.data.date
      })
    })
    .catch((err) =>{
      console.log('Error from update category')
    })
  },[id])

  return (
    <div>
    <h1>UPDATE CATEGORIES</h1>
    <div className='container'>
      <form>
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

export default Updatecategory
