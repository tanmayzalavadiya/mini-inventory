import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import authFetch from '../axiosbase/interceptors';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';



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


const PasswordFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px; /* Adjust width as needed */
  height: 300px; /* Set height equal to width to make it square */
  margin: 0 auto; /* Center the form horizontally */
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const ProfilePhoto = styled.div`
  flex: 1; /* Takes 1/3 of the space */
  margin-right: 20px; /* Adjust spacing between photo and data */
`;

const ProfilePhotoImg = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 50%; /* Rounded profile photo */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

const ErrorMessageStyled = styled(ErrorMessage)`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const EditProfileForm = () => {
  const navv = useNavigate()


  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    bio: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log(values);
    authFetch.patch(`/api/users/updateuser`,values).then((y)=>{
      console.log(y);
      toast.success("User updated successfully");
      navv('/ProfileForm')
    })
    setSubmitting(false);
  };

  // const handleSubmit = (values) => {
  //   console.log(values);
  //   // Handle the form submission, e.g., send the data to an API
  // };


  const passwordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    password: Yup.string()
      .min(8, 'New Password must be at least 8 characters')
      .required('New Password is required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm New Password is required'),
  });


  useEffect(() => {
    authFetch.get(`/api/users/getuser`).then((y) => {
      console.log(y.data);
      setData({
        email: y.data.email,
        name: y.data.name,
        phone: y.data.phone,
        photo: y.data.photo,
        bio:'',
      });
    });
  }, []);

  const [pass,setPass] = useState({
    oldPassword: '',
    password: '',
  })
  const handlePasswordSubmit = (values, { setSubmitting }) => {
    console.log(values);
    authFetch.patch(`/api/users/changepassword`, values).then((y) => {
      console.log(y);
      toast.success("Password changed successfully");
      setPass({
        oldPassword: '',
        password: '',
      });
    }).finally(() => {
      setSubmitting(false);
    });
  };

  // useEffect(() => {
  //   authFetch.get(`/api/users/getuser`).then((response) => {
  //     console.log(response.data);
  //     setData({
  //       email: response.data.email,
  //       name: response.data.name,
  //       phone: response.data.phone,
  //       bio: '',
  //     });
  //   });
  // }, []);


  return (
    <>
      <h1>Welcome, Tanmay</h1>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{borderRadius: 1 }}>
          <ProfileFormContainer>
            <ProfilePhoto>
              <ProfilePhotoImg src="profile-pic-url" alt="Profile" />
            </ProfilePhoto>
            <ProfileData>
              <Formik
                initialValues={data}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <ProfileField>
                      <ProfileLabel htmlFor="name">Name:</ProfileLabel>
                      <ProfileInput type="text" id="name" name="name" />
                      <ErrorMessageStyled name="name" component="div" />
                    </ProfileField>
                    <ProfileField>
                      <ProfileLabel htmlFor="email">Email:</ProfileLabel>
                      <ProfileInput type="email" id="email" name="email" />
                      <ErrorMessageStyled name="email" component="div" />
                    </ProfileField>
                    <ProfileField>
                      <ProfileLabel htmlFor="phone">Phone:</ProfileLabel>
                      <ProfileInput type="text" id="phone" name="phone" />
                      <ErrorMessageStyled name="phone" component="div" />
                    </ProfileField>
                    <ProfileField>
                      <ProfileLabel htmlFor="bio">Bio:</ProfileLabel>
                      <ProfileTextarea as="textarea" id="bio" name="bio" />
                      <ErrorMessageStyled name="bio" component="div" />
                    </ProfileField>
                    <SubmitButton type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Edit Profile'}
                    </SubmitButton>
                  </Form>
                )}
              </Formik>
            </ProfileData>
          </ProfileFormContainer>
        </Grid>
        <Grid item xs={6}  >
          <PasswordFormContainer>
          <Formik
              initialValues={pass}
              // enableReinitialize={true}
              validationSchema={passwordValidationSchema}
              onSubmit={handlePasswordSubmit}
            >
              {({ isSubmitting }) => (
                <Form >
                  <ProfileField>
                    <ProfileLabel htmlFor="oldPassword">Old Password:</ProfileLabel>
                    <ProfileInput type="password" id="oldPassword" name="oldPassword" />
                    <ErrorMessageStyled name="oldPassword" component="div" />
                  </ProfileField>
                  <ProfileField>
                    <ProfileLabel htmlFor="password">New Password:</ProfileLabel>
                    <ProfileInput type="password" id="password" name="password" />
                    <ErrorMessageStyled name="password" component="div" />
                  </ProfileField>
                  <ProfileField>
                    <ProfileLabel htmlFor="confirmNewPassword">Confirm New Password:</ProfileLabel>
                    <ProfileInput type="password" id="confirmNewPassword" name="confirmNewPassword" />
                    <ErrorMessageStyled name="confirmNewPassword" component="div" />
                  </ProfileField>
                  <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Change Password'}
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </PasswordFormContainer>
        </Grid>
      </Grid>

    </>
  );
};

export default EditProfileForm;
