import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { io } from "socket.io-client";
const socket = io('https://project-management-brian.herokuapp.com',{ transports : ['websocket'] });
// const socket = io('http://localhost:3000',{ transports : ['websocket'] });

import NewProject from './Tables/NewProject'
import DesignTable from './Tables/DesignTable'

export default function Header() {
  const [projectData, setProjectData] = useState({});
  const [tabValue, setTabValue] = React.useState('1');
  
  // checks if the socket io connected to the server
  socket.on("connect", () => {
    console.log('socket id is: '+socket.id);
  });
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
  socket.on('pushData', (pushedData) => {
      console.log('data pushed');
      //const data = pushedData.json();
      console.log(pushedData);
      //updates the list of items thats displayed
      if (pushedData !== null) {
        console.log('setting data');
        setProjectData(pushedData);
      }
  });

  //gets the list of items from the backend
  const UpdateItems = async () => {
    const response = await fetch("https://project-management-brian.herokuapp.com/getProjectData");
    //console.log(response);
    const data = await response.json();
    //updates the list of items thats displayed
    if (data !== null) setProjectData(data);
    //console.log(data);
  };

  //gets the data stored at the start of the program
  useEffect(() => {
    UpdateItems();
  },[]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      UpdateItems();
    },30000)
    return () => clearInterval(intervalId);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container sx={{maxWidth: 'lg'}}>
    <TabContext value={tabValue}>
        <Box sx={{backgroundColor:'lightblue' }}>
          <TabList onChange={handleTabChange}>
            <Tab label="Management" value="1" />
            <Tab label="Design" value="2" />
            <Tab label="New" value="3" sx={{position: 'absolute',right: '0'}}/>
            <Tab label="Fabrication" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{padding: 0, paddingTop:2}}>Management data display</TabPanel>
        <TabPanel value="2" sx={{padding: 0, paddingTop:2}}><DesignTable projectData={projectData} /></TabPanel>
        <TabPanel value="3" sx={{padding: 0, paddingTop:2}}><NewProject /></TabPanel>
        <TabPanel value="4" sx={{padding: 0, paddingTop:2}}>Fabrication data display</TabPanel>
      </TabContext>
    </Container>
  );
}