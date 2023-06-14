import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function GeneralProjectInfo(props) {
    console.log(props.projectInfo.projectName);
    
    const handleEdit = (event, name) => {
        console.log(name);
        console.log(event);
        console.log(props.id);

        fetch("https://project-management-brian.herokuapp.com/edit", {
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

    const deleteItem = (event, name) => {
        // console.log(name);
        // console.log(event);
        // console.log(props.id);

        fetch("https://project-management-brian.herokuapp.com/delete", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"_id":props.id})
            })
            .then(response => response.json())
            .then(data => {
                console.log('deleted successfully:'); 
            })
            .catch(error => {
                console.error('deletion failed', error);
            });
    }

    const copyItem = (event, name) => {
        // console.log(name);
        // console.log(event);
        // console.log(props.id);

        fetch("https://project-management-brian.herokuapp.com/copy", {
            // fetch("http://localhost:3000/copy", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"_id":props.id})
            })
            .then(response => response.json())
            .then(data => {
                console.log('copied successfully:'); 
            })
            .catch(error => {
                console.error('copy failed', error);
            });
    }

    return (
        <Card variant="outlined" style={{width:'100%', padding:10, margin:4}}>
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <p style={{fontSize: 20, height:20, margin:0, display:'flex',justifyContent:"start", alignItems:"start"}}>Project Info</p>
            </Grid>
            <Grid item xs={4}>
                <IconButton aria-label="delete" size="small" color="error" onClick={deleteItem} >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="copy" size="small" color="warning" onClick={copyItem}>
                    <ContentCopyIcon fontSize="inherit" />
                </IconButton>
            </Grid>
        </Grid>

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
