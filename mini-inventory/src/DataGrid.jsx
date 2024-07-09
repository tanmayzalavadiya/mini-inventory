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
import CardUse from './CardUse';
import { useNavigate } from 'react-router-dom';




export default function Data () {

const [data,setData] = useState([]);
const navv = useNavigate()



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
        <EditNoteIcon sx={{ fontSize: 20 }} 
        onClick={(event) => {
          handleClick(event, params);
          navv("/EditProduct")
        }}/>
      </Fab>
      <Fab style={{ backgroundColor: 'red', color: '#fff' }}  size="small" color="secondary" aria-label="edit">
        <DeleteIcon sx={{ fontSize: 20 }}/>
      </Fab>

      <Fab style={{ backgroundColor: 'purple', color: '#fff' }}  size="small" disabled aria-label="like">
        <VisibilityIcon sx={{ fontSize: 20 }}/>
      </Fab>
    </Box>
          )
        }
    },

  ];
  
  const handleClick = (event, params) => {
    // setAnchorEl(event.currentTarget);
    console.log(params.row.id);
    // data([params.row.id]);
  };
  
    useEffect(()=>{
  
      authFetch.get("/api/products/").then(y=>{
  
        setData(y.data.map((p)=>{
  
          return {...p,id: p._id};
  
        }))
      })
  
    },[])
  return (
    <>
      {/* <div style={cardContainerStyle}>
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
    </div>
     */}
     <CardUse data={data}/>
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

