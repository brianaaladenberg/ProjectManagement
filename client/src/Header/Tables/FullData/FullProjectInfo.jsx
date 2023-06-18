import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import GeneralProjectInfo from './Breakdown/GeneralProjectInfo'
import DesignInfo from './Breakdown/DesignInfo'
import Address from './Breakdown/Address';
import Divider from '@mui/material/Divider';

export default function FullProjectInfo(props) {
    console.log(Object.keys(props.projectData).length);
    if (Object.keys(props.projectData).length > 0 ) {
        console.log(props.projectData);
        const projectData = props.projectData.find(x => x._id === props.id);
        console.log(projectData);
        if (typeof projectData !== 'undefined'){
            return (
                <>
                    <GeneralProjectInfo projectInfo={projectData.projectInfo} id={props.id}/>
                    <DesignInfo designInfo={projectData.designInfo} id={props.id}/>
                    <Address designInfo={projectData.address} id={props.id}/>
                </>
            );
        } else {
            // return (<h1>No project selected</h1>);
            return (
                <>
                    <Card variant="outlined" style={{width:'100%', padding:10, margin:4, height:135 }}>
                        <p style={{fontSize: 20, height:20, margin:0, display:'inline'}}>Project Info</p>
                        <Divider style={{margin:4}}/>
                    </Card>
                    <Card variant="outlined" style={{width:'100%', padding:10, margin:4, height:135 }}>
                        <p style={{fontSize: 20, height:20, margin:0, display:'inline'}}>Address</p>
                        <Divider style={{margin:4}}/>
                    </Card>
                    <Card variant="outlined" style={{width:'100%', padding:10, margin:4, height:135 }}>
                        <p style={{fontSize: 20, height:20, margin:0, display:'inline'}}>Design Info</p>
                        <Divider style={{margin:4}}/>
                    </Card>
                </>
            );
        }
    }
};