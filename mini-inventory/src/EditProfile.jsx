import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import authFetch from './interceptors'
import { useNavigate } from 'react-router-dom';



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

const ProfileText = styled.div`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
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

const EditProfile = () => {

  const navv = useNavigate()

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    photo: '',
    phone: '',
    bio: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch data from API
    authFetch.get('/api/users/getuser')
      .then(response => {
        const data = response.data;
        setProfileData({
          name: data.name,
          email: data.email,
          photo: data.photo,
          phone: data.phone,
          bio: data.bio || ''
        });
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditMode(true);
    navv("/EditFullProfileForm")
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    bio: Yup.string()
  });

  

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log(values);
    // Update profile data on submit and switch back to view mode
    setProfileData(values);
    setIsEditMode(false);
    setSubmitting(false);
  };

  return (
    <>
              <h1>Welcome, Tanmay</h1>
    <ProfileFormContainer>
      <ProfilePhoto>
        <ProfilePhotoImg src={profileData.photo} alt="Profile" />
      </ProfilePhoto>
      <ProfileData>
        {isEditMode ? (
          <Formik
            enableReinitialize
            initialValues={profileData}
            validationSchema={validationSchema}
            onSubmit={() => {
          {handleClick}
          navv("/EditFullProfileForm")
        }}
            

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
                  {isSubmitting ? 'Submitting...' : 'Save Profile'}
                </SubmitButton>
              </Form>
            )}
          </Formik>
        ) : (
          <>
            <ProfileField>
              <ProfileLabel>Name:</ProfileLabel>
              <ProfileText>{profileData.name}</ProfileText>
            </ProfileField>
            <ProfileField>
              <ProfileLabel>Email:</ProfileLabel>
              <ProfileText>{profileData.email}</ProfileText>
            </ProfileField>
            <ProfileField>
              <ProfileLabel>Phone:</ProfileLabel>
              <ProfileText>{profileData.phone}</ProfileText>
            </ProfileField>
            <ProfileField>
              <ProfileLabel>Bio:</ProfileLabel>
              <ProfileText>{profileData.bio}</ProfileText>
            </ProfileField>
            <SubmitButton onClick={handleEditClick} >
              Edit Profile
            </SubmitButton>
          </>
        )}
      </ProfileData>
    </ProfileFormContainer>
    </>
  );
};

export default EditProfile;
