import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useGetData } from '../../custom-hooks'; 
import { serverCalls } from '../../api';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'; 


import { PlantForm } from '../PlantForm';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
  },
  {
    field: 'species',
    headerName: 'Species',
    width: 150,
    editable: true,
  },
  {
      field: 'description',
      headerName: 'Description',
      width: 150,
      editable: true,
  },
  {
      field: 'typical_climate',
      headerName: 'Typical Climate',
      width: 150,
      editable: true,
  },
  {
      field: 'known_uses',
      headerName: 'Known Uses',
      width: 250,
      editable: true,
  },
  {
      field: 'years_grown',
      headerName: 'Years Grown',
      width: 110,
      editable: true,
      type: 'number'
  },
];


interface gridData{
  data:{
    id?:string;
  }
}


export const DataTable = () => {
  let { plantData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
      setOpen(true)
    }

    let handleClose = () => {
      setOpen(false)
    }

    let deleteData = () => {
      serverCalls.delete(`${gridData[0]}`)
      getData()
    }

  console.log(gridData) // a list of id's from checked rows

  const MyAuth = localStorage.getItem('myAuth')
  console.log(MyAuth)
  
  if (MyAuth == 'true'){
    
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
        rows={plantData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel); }}
        {...plantData}
        />

        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

        {/*Dialog Pop Up begin */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update A Plant</DialogTitle>
          <DialogContent>
            <DialogContentText>Plant id: {gridData[0]}</DialogContentText>
              <PlantForm id={`${gridData[0]}`}/>
          </DialogContent>
          <DialogActions>
            <Button onClick = {handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color = "primary">Done</Button> 
          </DialogActions>
        </Dialog>
      </div>
    )
  }else {
    return (
      <div>
        <h3>Please Sign In to View Your Plant Collection</h3>
      </div>
    )
  }
}