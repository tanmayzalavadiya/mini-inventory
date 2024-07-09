import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import authFetch from './interceptors'
import { useEffect, useState } from 'react'
// cards
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import WidgetsIcon from '@mui/icons-material/Widgets';
// buttons
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { blue ,red,grey} from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';




const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 90,
    },
    { field: 'quantity', headerName: 'Quantity', width: 130 },

    {
      field: 'value',
      headerName: 'Value',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.price * row.quantity }`,
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      renderCell:(params)=>{
        return (
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab style={{ backgroundColor: 'green', color: '#fff' }}  size="small" color="primary" aria-label="add">
        <EditNoteIcon sx={{ fontSize: 20 }}/>
      </Fab>
      <Fab style={{ backgroundColor: 'red', color: '#fff' }}  size="small" color="secondary" aria-label="edit">
        <DeleteIcon sx={{ fontSize: 20 }}/>
      </Fab>

      <Fab style={{ backgroundColor: 'purple', color: '#fff' }}  size="small" disabled aria-label="like">
        <VisibilityIcon sx={{ fontSize: 20 }}/>
      </Fab>
    </Box>
        //   <IconButton
        // aria-label="more"
        // id="long-button"
        // aria-controls={open ? 'long-menu' : undefined}
        // aria-expanded={open ? 'true' : undefined}
        // aria-haspopup="true"
        // onClick={(event) => {
        //   handleClick(event, params);
        // }}
        // >
        //   {/* <MoreVertIcon /> */}
        // </IconButton>
          )
        }
    },

  ];
  
  
    const cardContainerStyle = {
      display: 'flex',
      flexWrap: 'wrap', // Optional: allows wrapping to the next line if there's not enough space
      gap: '16px', // Optional: adds spacing between cards
    };
  
  
    // const cardStyle = {
    //   minWidth: '275px',
    //   transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    // transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
    // boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
    // };
    // const card1Style = {
    //   // padding : '25px',
    //   minWidth: '275px',
    //   height: '250px',
    //   backgroundColor: '#b624ff', // Color for card 1
    //   color: '#fff',
    // };

    // const card1Style = {
    //   minWidth: '275px',  // Keep the width as is
    //   // height: '150px',    // Reduce the height to make it shorter
    //   backgroundColor: '#b624ff', // Color for card 1
    //   color: '#fff',
    // };

    const card1Style = {
      minWidth: '275px',
      height: '200px', // Adjusted height for demonstration
      backgroundColor: '#b624ff',
      color: '#fff',
      transition: 'transform 0.3s', // Add smooth transition on hover
      borderRadius: '10px', // Rounded corners for aesthetics
      cursor: 'pointer', // Change cursor on hover
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for depth
      margin: '10px', // Add some margin around the card
    };
    
  
    const card2Style = {
      minWidth: '275px',
      backgroundColor: '#32963d', // Color for card 2
      color: '#fff',
      transition: 'transform 0.3s', // Add smooth transition on hover
      borderRadius: '10px', // Rounded corners for aesthetics
      cursor: 'pointer', // Change cursor on hover
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for depth
      margin: '10px', // Add some margin around the card
    };
    const card3Style = {
      minWidth: '275px',
      backgroundColor: '#c41849', // Color for card 2
      color: '#fff',
      transition: 'transform 0.3s', // Add smooth transition on hover
      borderRadius: '10px', // Rounded corners for aesthetics
      cursor: 'pointer', // Change cursor on hover
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for depth
      margin: '10px', // Add some margin around the card
    };
    const card4Style = {
      minWidth: '275px',
      backgroundColor: '#03a5fc', // Color for card 2
      color: '#fff',
      transition: 'transform 0.3s', // Add smooth transition on hover
      borderRadius: '10px', // Rounded corners for aesthetics
      cursor: 'pointer', // Change cursor on hover
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for depth
      margin: '10px', // Add some margin around the card
    };
  
    const cardContentStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
    };
  
    const iconStyle = {
      fontSize: '40px',
    };
    const headFont ={
      fontSize : '30px'
    }
  
    const textContainerStyle = {
      textAlign: 'right',
    };

    // const [isHovered, setIsHovered] = useState(false);

export default function Data() {

 
    const [data,setData] = useState([]);
    useEffect(()=>{
  
      authFetch.get("/api/products/").then(y=>{
  
        setData(y.data.map((p)=>{
  
          return {...p,id: p._id};
  
        }))
      })
  
    },[])
  return (
    <>
      <div style={cardContainerStyle}>
      <Card style={card1Style} onMouseEnter={() => {}} onMouseLeave={() => {}} >
      <CardContent style={cardContentStyle}>
        <span>
          <ShoppingCartIcon style={iconStyle} />
        </span>
        <span style={textContainerStyle}>
          <p>Out of Stock</p>
          <h4 style={headFont} >0</h4>
        </span>
      </CardContent>
      </Card>

      <Card style={card2Style}>
      <CardContent style={cardContentStyle}>
        <span>
          <PaidIcon style={iconStyle} />
        </span>
        <span style={textContainerStyle}>
          <p>Total Value Score</p>
          <h4>0</h4>
        </span>
      </CardContent>
      </Card>

      <Card style={card3Style}>
      <CardContent style={cardContentStyle}>
        <span>
          <RemoveShoppingCartIcon style={iconStyle} />
        </span>
        <span style={textContainerStyle}>
          <p>Total Value Score</p>
          <h4>0</h4>
        </span>
      </CardContent>
      </Card>

      {/* Repeat the Card component for other cards */}
      <Card style={card4Style}>
      <CardContent style={cardContentStyle}>
        <span>
          <WidgetsIcon style={iconStyle} />
        </span>
        <span style={textContainerStyle}>
          <p>Total Value Score</p>
          <h4>0</h4>
        </span>
      </CardContent>
      </Card>
      {/* Repeat as needed */}
    </div>
    
    <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />


  </div>
  </>
  )
}
