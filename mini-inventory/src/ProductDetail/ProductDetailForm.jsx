import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './ProductDetail.css';
import authFetch from '../axiosbase/interceptors';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Grid,Typography } from '@mui/material';
import { red } from '@mui/material/colors';

const ProductDetailForm = () => {
  const {id} = useParams();

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    authFetch.get(`/api/products/${id}`).then((y) => {
      setData(y.data);
    });
  }, []);

  // const fetchProductData = async (setValues) => {
  //   try {
  //     const response = await authFetch.get(`/api/products/${id}`); 
  //     const product = response.data;

  //     setValues({
  //       name: product.name,
  //       sku: product.sku,
  //       category: product.category,
  //       price: product.price,
  //       quantity: product.quantity,
  //       totalValue: product.totalValue,
  //       description: product.description,
  //       createdAt: product.createdAt,
  //       updatedAt: product.updatedAt,
  //     });
  //   } catch (error) {
  //     console.error('There was an error fetching the product data!', error);
  //   }
  // };

  // const handleSubmit = (id, values, { setSubmitting }) => {
  //   authFetch.post(`/api/products/${id}`, values)
  //     .then(y => {
  //       console.log(y.data);
  //       setSubmitting(false);
  //       navigate('/myproduct');
  //     })
  //     .catch(error => {
  //       console.error('Error submitting form:', error);
  //       setSubmitting(false);
  //     });
  // };


  return (
    <Grid container spacing={2} className="form-container">
    <Grid item xs={12}>
      <Typography variant="h4" component="h1">Product Detail</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="body1">No image set for this product</Typography>
      <Typography variant="body1">Product Availability: In Stock</Typography>
    </Grid>
    <Formik
      initialValues={data}
      enableReinitialize 
    >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Name</Typography>
                <Field name="name" type="text" as={Typography} variant="body2"  sx={{ color: 'red' }}  disabled fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">SKU</Typography>
                <Field name="sku" type="text" as={Typography} variant="body2" disabled fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Category</Typography>
                <Field name="category" type="text" as={Typography} variant="body2" disabled fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Price</Typography>
                <Field name="price" type="number" as={Typography} variant="body2" disabled fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Quantity in stock</Typography>
                <Field name="quantity" type="number" as={Typography} variant="body2" disabled fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Total Value in stock</Typography>
                <Field name="totalValue" type="number" as={Typography} variant="body2" disabled fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Description</Typography>
                <Field name="description" as="textarea" className="form-field" disabled fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Created on</Typography>
                <Field name="createdAt" type="text" as={Typography} variant="body2" disabled fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Last Updated</Typography>
                <Field name="updatedAt" type="text" as={Typography} variant="body2" disabled fullWidth />
              </Grid>
              {/* <Grid item xs={12}>
                <Button type="submit" disabled={isSubmitting} variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </Grid> */}
            </Grid>
          </Form>
     
    </Formik>
  </Grid>
  );
};


export default ProductDetailForm;
