import React from 'react'
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import authFetch from './axiosbase/interceptors';



const validationSchema = Yup.object().shape({
    name: Yup.string('Invalid name').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    
  });
  
  const initialValues = {
    name:'',
    email: '',
    password: '',
  };

  
export default function Registration() {
  const navv = useNavigate()
  const notify = () => toast.success("Registration Succesfully");
    const handleSubmit = (values) => {
        // Handle submission logic here (e.g., API calls)
        authFetch.post(`http://localhost:8080/api/users/register`,values)
        .then((y)=>{
          console.log(y.data);
          navv("/Login")
          notify();
        })
        console.log(values);

      };

  return (
    <>
        <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Registration Form
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  fullWidth
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  label="Password"
                  fullWidth
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Register
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
 
    </>
  )
}