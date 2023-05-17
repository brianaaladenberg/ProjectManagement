import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import './styles.css'

export default function FormPropsTextFields() {
  
  const [listDateValue, setListDateValue] = useState(new Date());
  const [permitSubmittalDateValue, setPermitSubmittalDateValue] = useState(new Date());

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    console.log(listDateValue);
    console.log(permitSubmittalDateValue);

    const formJson = Object.fromEntries(formData.entries());

    formJson.listDate = listDateValue.$d;
    formJson.SubmittalDate = permitSubmittalDateValue.$d;

    console.log(formJson);

    fetch('https://project-management-brian.herokuapp.com/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "formJson":formJson })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Form submission successful');
        //updates the displayed items
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        // Do something with error
      });
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
    <Box
      sx={{
        '& .MuiTextField-root': { m: .5, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div class='inputAddressCard'>
        <Card variant="outlined">
          <h1>Project Information</h1>
          <TextField
            required
            name="ProjectNumber"
            id="outlined-required"
            label="Project Number"
          />
          <TextField
            required
            name="ProjectName"
            id="outlined-required"
            label="Project Name"
          />
          <TextField
              required
              sx={{width:222}}
              id="Department"
              select
              label="Department"
              name='Department'
              defaultValue=""
            >
            <MenuItem key='contract' value='contract'>
              contract
            </MenuItem>
            <MenuItem key='Daywork' value='Daywork'>
              Daywork
            </MenuItem>
            <MenuItem key='Road' value='Road'>
            Road
            </MenuItem>
          </TextField>
          <TextField
            name="ProjectManager"
            id="outlined-required"
            label="Project Manager"
          />
          <TextField
            name="ProjectArea"
            id="outlined-required"
            label="Project Area"
          />
          <TextField
            name="Priority"
            id="outlined-required"
            label="Priority"
          />
        </Card>
      </div>

      <div class='inputAddressCard'>
        <Card variant="outlined">
          <h1>Design Information</h1>
          <TextField
            required
            name="Designer"
            id="outlined-required"
            label="Designer"
          />
          <TextField
            required
            name="DesignHours"
            id="outlined-required"
            label="Design Hours"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{width:222}}
              name="ListDate"
              label="List Date"
              onChange={(newValue) => setListDateValue(newValue)}
            />
            <DatePicker
              sx={{width:222}}
              name="PermitSubmittal"
              id="outlined-required"
              label="Permit Submittal"
              onChange={(newValue) => setPermitSubmittalDateValue(newValue)}
            />
          </LocalizationProvider>
        </Card>
      </div>

      <div class='inputAddressCard'>
        <Card variant="outlined">
          <h1>Address</h1>
          <TextField
            required
            name="Street"
            id="outlined-required"
            label="Street"
          />
          <TextField
            required
            name="City"
            id="outlined-required"
            label="City"
          />
          <TextField
            required
            name="State"
            id="outlined-required"
            label="State"
          />
          <TextField
            required
            name="Building"
            id="outlined-required"
            label="Building"
          />
          <TextField
            required
            name="Area"
            id="outlined-required"
            label="Area"
          />
        </Card>
      </div>

      <hr />      
      {/* <button type="reset">Reset form</button> */}
      <Button variant="outlined" type="submit">Create Project</Button>
      </Box>
    </form>

  );
}