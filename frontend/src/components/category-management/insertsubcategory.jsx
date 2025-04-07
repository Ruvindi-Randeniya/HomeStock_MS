import React, {useState} from 'react'
import './insertsubcategory.css'
import axios from 'axios';

const Insertsubcategory = () => {
  const [formData, setFormData] = useState({
    categoryID: "",
    subCategoryID: "",
    subCategoryName: "",
    date: "",
    subCategoryImage: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, subCategoryImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("categoryID", formData.categoryID);
      data.append("subCategoryID", formData.subCategoryID);
      data.append("subCategoryName", formData.subCategoryName);
      data.append("date", formData.date);
      data.append("subCategoryImage", formData.subCategoryImage);

      await axios.post("http://localhost:3000/api/subcategory", data);
      alert("Sub-category added successfully");

    } catch (error) {
      alert("Sub-category addition failed");
    }
    
  };

  return (
    <div>
    <h1>ADDING SUB CATEGORIES</h1>
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

export default Insertsubcategory
