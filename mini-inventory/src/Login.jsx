import React from 'react'

import { Formik, Form, Field } from 'formik';
import { TextField, Button, Grid, Typography } from '@mui/material';
import * as yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authFetch from './axiosbase/interceptors';



const validationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
  });


export default function Login() {
  const navv = useNavigate()
 const notifyFail=()=> toast.error("Login Error!")
    
    const notify = () => toast.success("Login Succesfully");

    const handleSubmit = (values) => {

      authFetch.post("http://localhost:8080/api/users/login",values)
          .then(y=>{
            // localStorage.setItem("userInfo",JSON.stringify(y.data.token));
            console.log(y.data);
            navv("/myproduct")
            notify();
        }).catch(()=>{notifyFail()});
     
    }
    

  return (
    
    <>
        <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                error={false}
                helperText=""
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                error={false}
                helperText=""
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Typography variant="body2">
                <Button color="primary">Home</Button> Don't have an account?{' '}
                <Button color="primary" >Register</Button>
              </Typography>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
    </>
  )
}