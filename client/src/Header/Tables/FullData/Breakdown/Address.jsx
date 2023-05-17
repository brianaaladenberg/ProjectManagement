import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

export default function Address(props) {
    //console.log(props.designInfo);
    
    const handleEdit = (event, name) => {
        console.log(name);
        console.log(event);
        console.log(props.id);

        fetch("http://localhost:8000/edit", {
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
            <p style={{fontSize: 20, height:20, margin:0, display:'inline'}}>Address</p>
            <Divider style={{margin:4}}/>
            <TextField
                variant="standard"
                name="street"
                key={props.designInfo.street}
                defaultValue={props.designInfo.street}
                onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                InputProps={{disableUnderline: true, style: {fontSize: 15, height:15, padding:0 }}}
            /><br />
            <TextField
                variant="standard"
                name="city"
                key={props.designInfo.city}
                defaultValue={props.designInfo.city}
                onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                InputProps={{disableUnderline: true, style: {fontSize: 15, height:15}}}
            /><br />
            <TextField
                variant="standard"
                name="state"
                key={props.designInfo.state}
                defaultValue={props.designInfo.state}
                onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                InputProps={{disableUnderline: true , style: {fontSize: 15, height:15}}}
            /><br />
            <TextField
                variant="standard"
                name="building"
                key={props.designInfo.building}
                defaultValue={props.designInfo.building}
                onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                InputProps={{disableUnderline: true , style: {fontSize: 15, height:15}}}
            /><br />
            <TextField
                variant="standard"
                name="area"
                key={props.designInfo.area}
                defaultValue={props.designInfo.area}
                onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                InputProps={{disableUnderline: true , style: {fontSize: 15, height:15}}}
            />
        </Card>
    );
};
