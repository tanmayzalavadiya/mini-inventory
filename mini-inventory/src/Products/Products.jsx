import React from 'react'
import ProductsForm from './ProductsForm'
import { Drawer } from '@mui/material';



const Products = () => {
    const [open, setOpen] = React.useState(false);
    const [action, setAction] = React.useState('');

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        // setAction("add")
      }; 

      const opende =() => {
        setOpen(true);
      }
  return (
    <div>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>

      <ProductsForm  setAction={setAction} action={action}/>
      </Drawer>
    </div>
  )
}

export default Products
