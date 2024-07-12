import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './ProductDetail.css';
import authFetch from '../axiosbase/interceptors';
import { useNavigate } from 'react-router-dom';

const ProductDetailForm = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const fetchProductData = async (setValues) => {
    try {
      const response = await authFetch.get(`/api/products/${id}`); // Replace with your API endpoint
      const product = response.data;

      setValues({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
        totalValue: product.totalValue,
        description: product.description,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });
    } catch (error) {
      console.error('There was an error fetching the product data!', error);
    }
  };

  const handleSubmit = (id,values, { setSubmitting }) => {
    axios.post(`/api/products/${id}`, values)
      .then(response => {
        console.log(response.data);
        setSubmitting(false);
        navigate('/myproduct');
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        setSubmitting(false);
      });
  };

//   useEffect(() => {
//     axios.get('https://api.example.com/product/1')
//       .then(response => {
//         setProduct(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the product data!', error);
//       });
//   }, []);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   const {
//     name,
//     sku,
//     category,
//     price,
//     quantity,
//     totalValue,
//     description,
//     createdAt,
//     updatedAt
//   } = product;

//   const handleSubmit = (values, { setSubmitting }) => {
//     authFetch.get(`/api/products/${id}`)
//       .then(response => {
//         console.log(response.data);
//         setProduct(response.data);
//         // Handle success (e.g., redirect, show notification, etc.)
//         setSubmitting(false);
//       })
//       .catch(error => {
//         console.error('Error submitting form:', error);
//         // Handle error (e.g., show error message)
//         setSubmitting(false);
//       });
//   };
  

  return (
    <div className="form-container">
      <h1>Product Detail</h1>
      <p>No image set for this product</p>
      <p>Product Availability: In Stock</p>
      <Formik
        initialValues={{
          name: '',
          sku: '',
          category: '',
          price: '',
          quantity: '',
          totalValue: '',
          description: '',
          createdAt: '',
          updatedAt: ''
        }}
        onSubmit={handleSubmit}
      >
                {({ isSubmitting, setValues }) => {
          useEffect(() => {
            fetchProductData(setValues);
          }, [setValues]);

          return (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field name="name" type="text" className="form-field" disabled />
              </div>

              <div className="form-group">
                <label htmlFor="sku">SKU</label>
                <Field name="sku" type="text" className="form-field" disabled />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <Field name="category" type="text" className="form-field" disabled />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <Field name="price" type="number" className="form-field" disabled />
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity in stock</label>
                <Field name="quantity" type="number" className="form-field" disabled />
              </div>

              <div className="form-group">
                <label htmlFor="totalValue">Total Value in stock</label>
                <Field name="totalValue" type="number" className="form-field" disabled />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field name="description" as="textarea" className="form-field" disabled />
              </div>

              <div className="form-group">
                <label htmlFor="createdAt">Created on</label>
                <Field name="createdAt" type="text" className="form-field" disabled />
              </div>

              <div className="form-group">
                <label htmlFor="updatedAt">Last Updated</label>
                <Field name="updatedAt" type="text" className="form-field" disabled />
              </div>

              <button type="submit" disabled={isSubmitting} className="submit-button">
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};


export default ProductDetailForm;
