import React from 'react'
import { useEffect,useState } from 'react';
import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../Products/ProStyle.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import authFetch from '../axiosbase/interceptors';
import { useNavigate,useParams  } from 'react-router-dom';
import { toast } from 'react-toastify';




const EditProduct = () => {
  const {id} = useParams();
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

  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: ''
  });

  const handleSubmit = (values) => {
    console.log(values)
    authFetch.patch(`/api/products/${id}`,values).then((y)=>{
      console.log(y);
      toast.success("Product updated successfully");
      navv('/myproduct')
    })
  };
  
  useEffect(() => {
    authFetch.get(`/api/products/${id}`).then((y) => {
      console.log(y.data);
      setProductData({
        name: y.data.name,
        category: y.data.category,
        price: y.data.price,
        quantity: y.data.quantity,
        description: y.data.description,
      });
    });
  }, []);

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

  // const [id, setid] = React.useState([]);
  // const {id} = useParams()

  

  return (
    <div className="form-container">
      <h1>Edit Product</h1>
      <Formik
        initialValues={productData}
        enableReinitialize={true}
        validationSchema={validationSchema}
         onSubmit={handleSubmit}
        
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form >
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

  <button type="submit"  className="submit-button">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditProduct
