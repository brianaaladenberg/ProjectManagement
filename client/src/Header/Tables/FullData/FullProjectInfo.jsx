import React, { useEffect, useState } from 'react';
import GeneralProjectInfo from './Breakdown/GeneralProjectInfo'
import DesignInfo from './Breakdown/DesignInfo'
import Address from './Breakdown/Address';

export default function FullProjectInfo(props) {
    console.log(props);
    const projectData = props.projectData.find(x => x._id === props.id);
    console.log(projectData);
    if (typeof projectData !== 'undefined'){
        return (
            <>
                <GeneralProjectInfo projectInfo={projectData.projectInfo} id={props.id}/>
                <Address designInfo={projectData.address} id={props.id}/>
                <DesignInfo designInfo={projectData.designInfo} id={props.id}/>
            </>
        );
    } else {
        return (<h1>No project selected</h1>);
    }
};