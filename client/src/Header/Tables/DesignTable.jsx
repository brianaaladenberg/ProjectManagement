import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import FullProjectInfo from './FullData/FullProjectInfo';
import dayjs from 'dayjs';

//sets up the columns information
const columns = [
  { field: 'projectNumber', headerName: '#', width: 76, editable: true},
  { field: 'projectName', headerName: 'Project Name', width: 200, editable: true},
  { field: 'projectArea', headerName: 'Project Area', width: 150, editable: true},
  { field: 'designer', headerName: 'Designer', width: 100, editable: true},
  { field: 'listDate', headerName: 'List Date', width: 110, editable: true},
  { field: 'priority', headerName: 'Priority', width: 55, editable: true},
];

//get all of the data from mongodb here and send to the specific tab
export default function DesignTable({projectData}) {
  const [rowSelected, setRowSelected] = useState([1]);
  const [rowSelectedData, setRowSelectedData] = useState({});
  const [rowSelectedId, setRowSelectedId] = useState(0);

  //sets up the data displayed in each row - 
  //if any information is passed to this component
  console.log(rowSelectedId);
  if (projectData.length > 0) {
    var rows = projectData.map(i => 
    ({
      id: i._id,
      projectNumber: i.projectInfo.projectNumber, 
      projectName: i.projectInfo.projectName, 
      projectArea: i.projectInfo.projectArea, 
      designer: i.designInfo.designer,
      listDate: dayjs(i.designInfo.listDate).format('DD/MM/YYYY'),
      priority: i.designInfo.priority
    }));
  };

  //when a item in the design table is edited this is invoked to send the updated info to the backend
  const handleEdit = (params, event) => {
    var columnEdited = '';
    for (const key in event) {
      if (params[key] !== event[key]) {
        //console.log(params[key]);
        //console.log(event[key]);
        columnEdited = key;

        //sends this info to backend - the column edited, the new value, and the id of the object edited
        fetch("https://project-management-brian.herokuapp.com/edit", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"columnEdited":columnEdited,"value":params[columnEdited],"_id":params.id})
          })
          .then(response => response.json())
          .then(data => {
            console.log('edited successfully:');
          })
          .catch(error => {
            console.error('edit failed', error);
            // Do something with error
          });
      } 
    }
  }

  //returns the grid
  return (
    <>
      <Grid container direction="row" alignItems="flex-start" spacing={.25}>
        <Grid item xs={9}>
          {projectData.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              
              //keeps track of which row is selected
              onRowSelectionModelChange={ (newRowSelectionModel) => {
                projectData.filter ( obj => {
                  if (obj._id === newRowSelectionModel[0]) {
                    console.log(obj._id);
                    setRowSelectedId(obj._id);
                    //console.log(projectData.find(x => x._id === obj._id));
                    //setRowSelectedData(projectData.find(x => x._id === obj._id));
                  }
                });
              }}
              rowSelectionModel={rowSelected}
              processRowUpdate={handleEdit}
              hideFooterSelectedRowCount
            />
          ) : (
            <h1>Error getting data</h1>
          )}
        </Grid>
        <Grid container xs={3} spacing={.25}>
          <FullProjectInfo projectData={projectData} id={rowSelectedId}/>
        </Grid>
      </Grid>
    </>
  );
}