import React from 'react'
import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Products/ProStyle.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import authFetch from './interceptors'
import { useNavigate } from 'react-router-dom';


const EditProduct = () => {
    const navv = useNavigate()

  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
      [{ 'header': '1' }, { 'header': '2' }, { 'header': [3, 4, 5, 6] }, { 'font': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ]
  };
  
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'align', 'color', 'background'
  ];

  const handleSubmit = (values, { setSubmitting }) => {
    authFetch.post("/api/products/", values)
      .then(response => {
        console.log(response.data);
        // Handle success (e.g., redirect, show notification, etc.)
        setSubmitting(false);
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        // Handle error (e.g., show error message)
        setSubmitting(false);
      });
  };
  
  
    // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Product Name is required'),
    category: Yup.string().required('Product Category is required'),
    price: Yup.number()
      .required('Product Price is required')
      .positive('Product Price must be positive'),
      quantity: Yup.number()
      .required('Product Quantity is required')
      .min(0, 'Product Quantity cannot be negative'),
      description: Yup.string().required('Product Description is required'),
  });

  const [id, setid] = React.useState([]);

  return (
    <div className="form-container">
      <h1>Edit Product</h1>
      <Formik
        initialValues={{
          name: '',
          category: '',
          price: '',
          quantity: '',
          description: '',
        }}
        validationSchema={validationSchema}
         onSubmit={handleSubmit}
        
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form setid={setid}>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <Field type="text" name="name" className="form-field" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="category">Product Category</label>
              <Field type="text" name="category" className="form-field" />
              <ErrorMessage name="category" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="price">Product Price</label>
              <Field type="number" name="price" className="form-field" />
              <ErrorMessage name="price" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Product Quantity</label>
              <Field type="number" name="quantity" className="form-field" />
              <ErrorMessage name="quantity" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Product Description</label>
              <ReactQuill
                theme="snow"
                value={values.description}
                onChange={(value) => setFieldValue('description', value)}
                modules={modules}
                formats={formats}
              />
              <ErrorMessage name="description" component="div" className="error-message" />
            </div>

  <button type="submit" disabled={isSubmitting} className="submit-button" onClick={()=>{navv("/myproduct")}}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditProduct
