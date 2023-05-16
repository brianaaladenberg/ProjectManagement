import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from '@mui/x-date-pickers/DateField';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import './styles.css'

export default function DesignInfo(props) {
    //console.log(props.designInfo);
    
    const handleEdit = (event, name) => {
        // console.log(name);
        // console.log(event);
        // console.log(props.id);

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
        <p style={{fontSize: 20, height:20, margin:0, display:'inline'}}>Design Info</p>
        <Divider style={{margin:4}}/>
            <p style={{fontSize: 15, height:20, margin:0, display:'inline', color:'rgb(90, 90, 90)'}}>Designer: </p>
            <TextField
                variant="standard"
                name="designer"
                key={props.designInfo.designer}
                defaultValue={props.designInfo.designer}
                onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                InputProps={{disableUnderline: true, style: {fontSize: 15, height:20, width:100}}}
            /><br />
            <p style={{fontSize: 15, height:20, margin:0, display:'inline', color:'rgb(90, 90, 90)'}}>Design Hours: </p>
            <TextField
                variant="standard"
                name="hoursRemaining"
                key={props.designInfo.hoursRemaining}
                defaultValue={props.designInfo.hoursRemaining}
                onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                InputProps={{disableUnderline: true, style: {fontSize: 15, height:20, width:50}}}
            /><br />
            <p style={{fontSize: 15, height:20, margin:0, display:'inline', color:'rgb(90, 90, 90)'}}>Priority: </p>
            <TextField
                variant="standard"
                name="priority"
                key={props.designInfo.priority}
                defaultValue={props.designInfo.priority}
                onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                InputProps={{disableUnderline: true , style: {fontSize: 15, height:20, width:50}}}
            /><br />
            <p style={{fontSize: 15, height:20, margin:0, display:'inline', color:'rgb(90, 90, 90)'}}>Submittal: </p>
            <div style={{display:'inline-block', width:85}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DateField
                        variant="standard"
                        name="listDate"
                        key={dayjs(props.designInfo.permitSubmital)}
                        defaultValue={dayjs(props.designInfo.permitSubmital)}
                        onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                        InputProps={{disableUnderline: true , style: { overflow:'hidden', fontSize: 15, height:20, width:110, padding:0}}}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
            <br />
            <p style={{fontSize: 15, height:20, margin:0, display:'inline', color:'rgb(90, 90, 90)'}}>List Date: </p>
            <div style={{display:'inline-block', width:85}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DateField
                        variant="standard"
                        name="listDate"
                        key={dayjs(props.designInfo.listDate)}
                        defaultValue={dayjs(props.designInfo.listDate)}
                        onBlur={(e) => handleEdit(e.target.value, e.target.name)}
                        InputProps={{disableUnderline: true , style: { overflow:'hidden', fontSize: 15, height:20, padding:0}}}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
        </Card>
    );
};

{/* <TextField
    variant="standard"
    name="listDate"
    key={props.designInfo.listDate}
    defaultValue={props.designInfo.listDate}
    onBlur={(e) => handleEdit(e.target.value, e.target.name)}
    InputProps={{disableUnderline: true , style: {fontSize: 15, height:20}}}
/> */}