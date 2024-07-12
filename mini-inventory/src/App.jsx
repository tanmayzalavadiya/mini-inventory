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



function App() {
  const [count, setCount] = useState(0)

  const ProductForm = withTitle(MyForm)
  const ProductData = withTitle(Data)
  const EditForm = withTitle(EditProduct)
  const ProductDetail = withTitle(ProductDetailForm)
  const ProfileForm = withTitle(EditProfile)
  const EditFullProfileForm = withTitle(EditProfileForm)





  return (
    <>
  {/* <ul>
<li>
  <Link to='/Login' >Login</Link>
</li>
<li>
  <Link to='/Registration' >Registration</Link>
</li>
<li>
  <Link to='/' >Dashboard</Link>
</li>
<li>
  <Link to='/myproduct' >myproduct</Link>
</li>
<li>
  <Link to='/ProductsForm' >ProductsForm</Link>
</li>
</ul> */}


      <Routes>
        <Route path='/Registration' element={<Registration />}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/' element={<Dashboard/>}/>
        {/* <Route path='/Products' element={<Products/>}/> */}
        <Route path='/ProductsForm' element={<ProductForm/>}/>
        {/* <Route path='/myproduct' element={<ProductForm/>}/> */}
        <Route path='/myproduct' element={<ProductData/>}/>
        <Route path='/EditProduct/:id' element={<EditForm/>}/>
        <Route path='/ProductDetailForm' element={<ProductDetail/>}/>
        <Route path='/ProfileForm' element={<ProfileForm/>}/>
        <Route path='/EditFullProfileForm' element={<EditFullProfileForm/>}/>








        {/* <Route path="/" component={<Login/>} />
        <Redirect to="/" /> */}
        
      </Routes>
    </>
  )
}

export default App
