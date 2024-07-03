import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import authFetch from './interceptors'
import { useEffect, useState } from 'react'




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
  ];
  
  
  


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
  )
}
