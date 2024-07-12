import React from 'react'
import { Formik, Form, Field,ErrorMessage } from 'formik';
import { Grid,Typography } from '@mui/material';
import { useState,useEffect } from 'react';
import authFetch from '../axiosbase/interceptors';
import '../ProductDetail/ProductDetail.css'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';




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
    <ProfileFormContainer>
    <ProfileData>
      <Formik
        initialValues={data}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
         {({ isSubmitting, values, setValues }) => {
            useEffect(() => {
              setValues(data);
            }, [data, setValues]);

            return (
              <Form>
                <ProfileField>
                  <ProfileLabel htmlFor="subject">Subject:</ProfileLabel>
                  <ProfileInput type="text" id="subject" name="subject" />
                  <ErrorMessageStyled name="subject" component="div" />
                </ProfileField>

                <ProfileField>
                  <ProfileLabel htmlFor="message">Message:</ProfileLabel>
                  <ProfileTextarea type="textarea" id="message" name="message" />
                  <ErrorMessageStyled name="message" component="div" />
                </ProfileField>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  Submit
                </SubmitButton>
              </Form>
            );
          }}
      </Formik>
    </ProfileData>
  </ProfileFormContainer>

  )
}

export default Report
