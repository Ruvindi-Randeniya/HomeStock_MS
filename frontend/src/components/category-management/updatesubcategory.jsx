import React, {useEffect, useState} from 'react'
import './updatesubcategory.css'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const Updatesubcategory = () => {
  const [formData, setFormData] = useState({
    categoryID: "",
    subCategoryID: "",
    subCategoryName: "",
    date: "",
    subCategoryImage: ""
  });

  const {id} = useParams()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, subCategoryImage: e.target.files[0] });
  };

 useEffect(() =>{
    axios
    .get(`http://localhost:3000/api/subcategory/${id}`)
    .then((res)=>{
        setFormData({
            categoryID: res.data.categoryID,
            subCategoryID: res.data.subCategoryID,
            subCategoryName: res.data.subCategoryName,
            subCategoryImage: res.data.subCategoryImage,
            date: res.data.date
        })
    })
    .catch((err) =>{
        console.log('Error from update category')
    })
 },[id])

  return (
    <div>
    <h1>UPDATE SUB CATEGORIES</h1>
    <div className='container'>
      <form>
        <label htmlFor='categoryID'> Category ID</label> 
        <input type='text' placeholder='Enter Category ID' name='categoryID' value={formData.categoryID} onChange={handleChange} required/> <br/>

        <label htmlFor='subcategoryID'>Sub Category ID</label> 
        <input type='text' placeholder='Enter Sub-Category ID' name='subCategoryID' value={formData.subCategoryID} onChange={handleChange} required/> <br/>

        <label htmlFor='subcategoryName'>Sub Category Name</label>
        <input type='text' placeholder='Enter Sub-Category Name' name='subCategoryName' value={formData.subCategoryName} onChange={handleChange} required/><br/>

        <label htmlFor='date'> Create Date</label>
        <input type='date'value={formData.data} onChange={handleChange} required/><br/>

        <label htmlFor='subcategoryimage'> Sub Category Image</label>
        <input type='file' placeholder='Select Image' name='subimage'onChange={handleFileChange} required/><br/>

        <button type='clear' onClick={() => setFormData({ categoryID: '', subCategoryID: '', subCategoryName: '', data: '', subCategoryImage: ''})}>CLEAR</button>
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
    </div>
  )
}

export default Updatesubcategory
