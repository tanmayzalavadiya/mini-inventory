import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route,Link} from 'react-router-dom'
import Registration from './Registration'
import Login from './Login'
import Dashboard from './Dashboard/Dashboard'
import Products from './Products/Products'
import ProductsForm from './Products/ProductsForm'
import MyForm from './MyForm'
import withTitle from './Layout'
import Data from './DataGrid'
import EditProduct from './EditProduct/EditProduct'
import ProductDetailForm from './ProductDetail/ProductDetailForm'
import EditProfile from './EditProfile/EditProfile'
import EditProfileForm from './EditProfile/EditProfileForm'
import Report from './Report Bug/Report'



function App() {

  const ProductForm = withTitle(MyForm)
  const ProductData = withTitle(Data)
  const EditForm = withTitle(EditProduct)
  const ProductDetail = withTitle(ProductDetailForm)
  const ProfileForm = withTitle(EditProfile)
  const EditFullProfileForm = withTitle(EditProfileForm)
  const ReportBug = withTitle(Report)





  return (
    <>
 


      <Routes>
        <Route path='/Registration' element={<Registration />}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/' element={<Dashboard/>}/>
        {/* <Route path='/Products' element={<Products/>}/> */}
        <Route path='/ProductsForm' element={<ProductForm/>}/>
        {/* <Route path='/myproduct' element={<ProductForm/>}/> */}
        <Route path='/myproduct' element={<ProductData/>}/>
        <Route path='/EditProduct/:id' element={<EditForm/>}/>
        <Route path='/ProductDetailForm/:id' element={<ProductDetail/>}/>
        <Route path='/ProfileForm' element={<ProfileForm/>}/>
        <Route path='/EditFullProfileForm' element={<EditFullProfileForm/>}/>
        <Route path='/ReportBug' element={<ReportBug/>}/>
      </Routes>
    </>
  )
}

export default App
