import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

export default function GeneralProjectInfo(props) {
    console.log(props.projectInfo.projectName);
    
    const handleEdit = (event, name) => {
        console.log(name);
        console.log(event);
        console.log(props.id);

        fetch("http://localhost:3000/edit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"columnEdited":name,"value":event,"_id":props.id})
            })
            .then(response => response.json())
            .then(data => {
                console.log('edited successfully:'); 
            })
            .catch(error => {
                console.error('edit failed', error);
            });
    }

    return (
        <Card variant="outlined" style={{width:'100%', padding:10, margin:4}}>
            <p style={{fontSize: 20, height:20, margin:0, display:'inline'}}>Project Info</p>
            <Divider style={{margin:4}}/>
            <TextField
                variant="standard"
                name="projectName"
                key={props.projectInfo.projectName}
                defaultValue={props.projectInfo.projectName}
                onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                InputProps={{disableUnderline: true, style: {fontSize: 20, height:20}}}
            /><br />
            <TextField
                variant="standard"
                name="projectArea"
                key={props.projectInfo.projectArea}
                defaultValue={props.projectInfo.projectArea}
                onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                InputProps={{disableUnderline: true, style: {fontSize: 20, height:20}}}
            /><br />
            <TextField
                variant="standard"
                name="projectNumber"
                key={props.projectInfo.projectNumber}
                defaultValue={props.projectInfo.projectNumber}
                onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                InputProps={{disableUnderline: true , style: {fontSize: 15, height:20, width:70}}}
            />
            <TextField
                variant="standard"
                name="department"
                key={props.projectInfo.department}
                defaultValue={props.projectInfo.department}
                onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                InputProps={{disableUnderline: true , style: {fontSize: 15, height:20}}}
            /><br />
            <p style={{fontSize: 15, height:20, margin:0, display:'inline', color:'rgb(90, 90, 90)'}}>PM: </p>
            <TextField
                variant="standard"
                name="projectManager"
                key={props.projectInfo.projectManager}
                defaultValue={props.projectInfo.projectManager}
                onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                InputProps={{disableUnderline: true , style: {fontSize: 15, height:20}}}
            />
        </Card>
    );
};
