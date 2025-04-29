import React, {useEffect, useState} from 'react'
import './insertsubcategory.css'
import axios from 'axios';
import Swal from 'sweetalert2'

const Insertsubcategory = () => {
  const [subcategory, setSubCategory] = useState({
    categoryID: "",
    subCategoryID: "",
    subCategoryName: "",
    date: "",
    subCategoryImage: ""
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const generateSubCategoryID = () =>{
    return Math.floor(Math.random()*100000)
  }

  useEffect(() =>{
    const newSubCategoryID = generateSubCategoryID();
    setSubCategory((prevSubCategory) =>({
      ...prevSubCategory,
      subCategoryID: newSubCategoryID,
    }))
  }, [])

  const handleChange = (e) =>{
    const{ name, value} = e.target;

    setSubCategory((prevSubCategory) =>({
      ...prevSubCategory,
      [name]: value,
    }))

    if (validationErrors[name]){
      setValidationErrors((prevErrors) =>({
        ...prevErrors,
        [name]: null,
      }))
    }
  }

  const handleFileChange = (e) => {
    setSubCategory({...subcategory, subCategoryImage: e.target.files[0]})
  }

  const validationFields =() =>{
    let errors = {};

    for (const [key,value] of Object.entries(subcategory)){
      if(!value){
        errors[key] = 'This field is required.'
      }
    }
     
    return errors;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setIsSubmitted(true);

    const errors = validationFields();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0){
       const formData = new FormData();
       formData.append('categoryID', subcategory.categoryID);
       formData.append('subCategoryID', subcategory.subCategoryID);
       formData.append('subCategoryName', subcategory.subCategoryName);
       formData.append('date', subcategory.date);
       if (subcategory.subCategoryImage instanceof File) {
        formData.append('subCategoryImage', subcategory.subCategoryImage);
      } else {
        console.error("No valid file selected for subCategoryImage");
        return; // optionally stop the submission
      }
      


      axios.post('http://localhost:3000/api/subcategory',formData,{
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      .then(()=>{
        setSubCategory({
          categoryID:'',
          subCategoryID: generateSubCategoryID(),
          subCategoryName: '',
          subCategoryImage: '',
          date:'',
        })

        Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'Sub-Category added successfully!',
          confirmButtonText: 'OK'
        })
      })
      .catch((error)=>{
        setErrorMessage('Failed to add Sub-Category. Please try again.');
        setShowPopup(true);
        setTimeout(()=>setShowPopup(false), 3000)
      })
    }
  }

  return (
    <div>
    <h1>ADDING SUB CATEGORIES</h1>
    <div className='container'>
     {showPopup&&(
      <div style={{
        padding: '10px',
        backgroundColor: errorMessage ? '#f8d7da' : '#d4edda',
        color: errorMessage ? '#721c24' : '#155724',
                border: `1px solid ${errorMessage ? '#f5c6cb' : '#c3e6cb'}`,
                borderRadius: '5px',
                marginBottom: '20px' 
      }}>
        {errorMessage}
        </div>
     )} 
    <form onSubmit={handleSubmit}>
        <label htmlFor='categoryID'> Category ID</label> 
        <input type='text' placeholder='Enter Category ID' name='categoryID' value={subcategory.categoryID} onChange={handleChange} required/> <br/>

        <label htmlFor='subcategoryID'>Sub Category ID</label> 
        <input type='text' placeholder='Enter Sub-Category ID' name='subCategoryID' value={subcategory.subCategoryID} onChange={handleChange} required/> <br/>

        <label htmlFor='subcategoryName'>Sub Category Name</label>
        <input type='text' placeholder='Enter Sub-Category Name' name='subCategoryName' value={subcategory.subCategoryName} onChange={handleChange} required/><br/>

        <label htmlFor='date'> Create Date</label>
        <input type='date' name='date' value={subcategory.date} onChange={handleChange} required />

        <label htmlFor='subcategoryimage'> Sub Category Image</label>
        <input type='file' name='subCategoryImage' onChange={handleFileChange} required />

        <button type='button' onClick={() => setSubCategory({
          categoryID: '',
          subCategoryID: generateSubCategoryID(),
          subCategoryName: '',
          date: '',
          subCategoryImage: '',
        })} >CLEAR</button>
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
    </div>
  )
}

export default Insertsubcategory
