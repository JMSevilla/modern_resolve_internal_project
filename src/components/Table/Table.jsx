import React, {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { rowCreativeDesign } from '../../redux/core/utils/helper';
import MUIButton from '../Button/Button';
import {Chip} from '@mui/material'

 function ProjectTable({ projectData, openEdit }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstname', headerName: 'First name', width: 130 },
    { field: 'lastname', headerName: 'Last name', width: 130 },
    { field: 'username', headerName: 'Username', width: 130 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstname || ''} ${params.row.lastname || ''}`,
    },
    { 
      field: 'userType',
      headerName: 
      'User Control', 
      width: 130,
      renderCell : (params) => {
        if(params.value === '1') {
          return (
            <>
              <Chip label="Administrator" color="success" />
            </>
          )
        } else if (params.value === '2') {
          return (
            <>
              <Chip label="Developer" color="primary" />
            </>
          )
        }
      }
     },
     { 
      field: 'isLock',
      headerName: 
      'User Access', 
      width: 180,
      renderCell : (params) => {
        if(params.value === '1') {
          return (
            <>
              <Chip label="Account Lock" color="error" />
            </>
          )
        } else if (params.value === '0') {
          return (
            <>
              <Chip label="Access Granted" color="success" />
            </>
          )
        }
      }
     },
     {
        headerName : 'Actions',
        width: 180,
        sortable: false,
        renderCell : (params) => {
          return(
              <>
                  <div style={{display : 'flex'}}>
                  <MUIButton 
                      size={'sm'}
                      variant={'outlined'}
                      color={'primary'}
                      onhandleClick={() => openEdit(
                        params.row.id, params.row.firstname,
                        params.row.lastname)}
                      buttonName={'Edit'} /> &nbsp;
                  <MUIButton 
                      size={'sm'}
                      variant={'outlined'}
                      color={'error'}
                      buttonName={'Delete'} />
                  </div>
              </>
          )
        }
       }
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rowCreativeDesign(projectData)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        style={{width: '100%'}}
      />
    </div>
  );
}

export default ProjectTable