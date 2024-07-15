import React from 'react'
import { Formik, Form, Field,ErrorMessage } from 'formik';
import { Grid,Typography } from '@mui/material';
import { useState,useEffect } from 'react';
import authFetch from '../axiosbase/interceptors';
import '../ProductDetail/ProductDetail.css'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Paper} from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwitterIcon from '@mui/icons-material/Twitter';





const ProfileFormContainer = styled.div`
  display: flex;
  align-items: flex-start; /* Align items to the top */
  max-width: 800px; /* Adjust maximum width as needed */
  margin: 0 auto; /* Center the form horizontally */
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const ProfileData = styled.div`
  flex: 2; /* Takes 2/3 of the space */
`;

const ProfileField = styled.div`
  margin-bottom: 15px;
`;

const ProfileLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProfileInput = styled(Field)`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ProfileTextarea = styled(Field)`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px; /* Adjust minimum height */
  resize: vertical; /* Allow vertical resizing */
`;

const ErrorMessageStyled = styled(ErrorMessage)`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0056b3;
  }
`;


const Report = () => {
    
    const [data, setData] = useState({
        subject: '',
        message: ''
      });
    
      const handleSubmit = (values, { setSubmitting }) => {
        
            authFetch.post(`/api/contactus`,values).then((y) => {
              setData(y.data);
              console.log(values);
        setSubmitting(false);
            });
         
      };
  return (
    <>
      <Formik
        initialValues={data}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
                <Grid container spacing={2}>
                <Grid item xs={6} >
              <Form>
                <Grid  item xs={12}>
                  <ProfileLabel htmlFor="subject">Subject:</ProfileLabel>
                  <ProfileInput type="text" id="subject" name="subject" />
                  <ErrorMessageStyled name="subject" component="div" />
                  </Grid>

                  <Grid item xs={12}>
                  <ProfileLabel htmlFor="message">Message:</ProfileLabel>
                  <ProfileTextarea type="textarea" id="message" name="message" />
                  <ErrorMessageStyled name="message" component="div" />
                  </Grid>

                  <Grid item xs={12}>
                <SubmitButton type="submit" >
                  Submit
                </SubmitButton>
                </Grid>
              </Form>
                </Grid>


                <Grid item xs={5} sx={{bgcolor : "#fff", m: 5 ,borderRadius: 1 }} >
                <Typography>
                    <h2>Our Contact Information</h2>
                    <p>Fill the form or contact us via other channels listed below</p>
                    <p><PhoneIcon/> 070123123123</p>
                    <p><EmailIcon/>Support@invent.com</p>
                    <p><LocationOnIcon/>Abuja, Nigeria</p>
                    <p><TwitterIcon/>@ZinoTrust</p>
                </Typography>
                </Grid>
              </Grid>
            
      </Formik>

  </>

  )
}

export default Report
