import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../Products/ProStyle.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  


const ProductsForm = () => {
    // Validation schema using Yup
  const validationSchema = Yup.object({
    productName: Yup.string().required('Product Name is required'),
    productCategory: Yup.string().required('Product Category is required'),
    productPrice: Yup.number()
      .required('Product Price is required')
      .positive('Product Price must be positive'),
    productQuantity: Yup.number()
      .required('Product Quantity is required')
      .min(0, 'Product Quantity cannot be negative'),
    productDescription: Yup.string().required('Product Description is required'),
  });
  return (
    <div className="form-container">
      <h1>Add New Product</h1>
      <Formik
        initialValues={{
          productName: '',
          productCategory: '',
          productPrice: '',
          productQuantity: '',
          productDescription: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <Field type="text" name="productName" className="form-field" />
              <ErrorMessage name="productName" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="productCategory">Product Category</label>
              <Field type="text" name="productCategory" className="form-field" />
              <ErrorMessage name="productCategory" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="productPrice">Product Price</label>
              <Field type="number" name="productPrice" className="form-field" />
              <ErrorMessage name="productPrice" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="productQuantity">Product Quantity</label>
              <Field type="number" name="productQuantity" className="form-field" />
              <ErrorMessage name="productQuantity" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="productDescription">Product Description</label>
              <ReactQuill
                theme="snow"
                value={values.productDescription}
                onChange={(value) => setFieldValue('productDescription', value)}
                modules={modules}
                formats={formats}
              />
              <ErrorMessage name="productDescription" component="div" className="error-message" />
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-button">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ProductsForm
