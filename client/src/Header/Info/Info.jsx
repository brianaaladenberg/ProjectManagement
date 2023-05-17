import React, { useEffect, useState } from 'react';

//get all of the data from mongodb here and send to the specific tab
export default function Info({displayTab}) {

  return (
    <div>
      <h1>{displayTab}</h1>
    </div>
  );
}