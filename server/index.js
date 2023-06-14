import * as dotenv from 'dotenv';
dotenv.config({path:'.env'});
import express from "express";
const app = express();

import path from 'path';
import { fileURLToPath } from 'url';

import bodyParser from "body-parser";
import mongoose from "mongoose";
import projectDBmodel from "./data/projectDBmodel.js";

import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

//checks if the socket io connected
io.on("connection", (socket) => {
  console.log('connected to socket: '+socket);
});

app.use(bodyParser.json({limit:"30mb", extended: true }));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());
app.set("view engine", "ejs");

//sends the data to front end
app.use("/getProjectData", async(req, res) => {
  // prints the recieved data to the console
  //console.log('sending data');
  const allItems = await projectDBmodel.find().exec();
  res.json(allItems);
});

app.use("/edit", async(req, res) => {
  // prints the recieved data to the console
  if (req.body._id !== undefined) {

    //see which subset the data is in
    let subData = '';
    if(req.body.columnEdited==='projectName' || req.body.columnEdited==='projectNumber' || req.body.columnEdited==='department' || req.body.columnEdited==='projectManager' || req.body.columnEdited==='projectArea') {
      subData = 'projectInfo.';
    } else if (req.body.columnEdited==='designer' ||req.body.columnEdited==='hoursRemaining' ||req.body.columnEdited==='priority' || req.body.columnEdited==='permitSubmittal' || req.body.columnEdited==='listDate') {
      subData = 'designInfo.';
    } else if (req.body.columnEdited==='area' ||req.body.columnEdited==='building' ||req.body.columnEdited==='city' || req.body.columnEdited==='state' || req.body.columnEdited==='street') {
      subData = 'address.';
    }

    console.log("editing: " + req.body.columnEdited + " to a value of "+req.body.value+" in the item id "+req.body._id);

    //update the database with the submitted data
    const info = {};
    info[subData+req.body.columnEdited] = req.body.value;
    await projectDBmodel.findByIdAndUpdate(req.body._id, info);

    //get updated data from mongoDB and push it to the clients
    const allItems = await projectDBmodel.find().exec();
    io.emit('pushData',allItems);
    res.json({ message: "edit successful!" });

  } else {
    res.json({ message: "edit unsuccessful" });
  }
});

app.use("/delete", async(req, res) => {
  // prints the recieved data to the console
  if (req.body._id !== undefined) {
    console.log("deleting item with id: "+req.body._id);

    //delete the item from the database
    await projectDBmodel.findByIdAndDelete(req.body._id);

    //get updated data from mongoDB and push it to the clients
    const allItems = await projectDBmodel.find().exec();
    io.emit('pushData',allItems);
    res.json({ message: "delete successful!" });
  } else {
    res.json({ message: "delete unsuccessful" });
  }
});

app.use("/copy", async(req, res) => {
  // prints the recieved data to the console
  if (req.body._id !== undefined) {
    console.log("copying item with id: "+req.body._id);

    //delete the item from the database
    let itemToDuplicate = await projectDBmodel.findById(req.body._id);

    //console.log(itemToDuplicate);

    const newEntry = new projectDBmodel({
      projectInfo: {
        projectNumber: itemToDuplicate.projectInfo.projectNumber,
        projectName: itemToDuplicate.projectInfo.projectName,
        department: itemToDuplicate.projectInfo.department,
        projectManager: itemToDuplicate.projectInfo.projectManager,
        projectArea: itemToDuplicate.projectInfo.projectArea
      },
      designInfo: {
        designer: itemToDuplicate.designInfo.designer,
        hoursRemaining: itemToDuplicate.designInfo.hoursRemaining,
        priority: itemToDuplicate.designInfo.priority,
        permitSubmital: itemToDuplicate.designInfo.permitSubmital,
        listDate: itemToDuplicate.designInfo.listDate
      },
      fabInfo: {
        shipDate: itemToDuplicate.fabInfo.shipDate,
        listNumber: itemToDuplicate.fabInfo.listNumber,
        welds: itemToDuplicate.fabInfo.welds,
        mains: itemToDuplicate.fabInfo.mains,
        lines: itemToDuplicate.fabInfo.lines,
        hangers: itemToDuplicate.fabInfo.hangers,
        sprinklers: itemToDuplicate.fabInfo.sprinklers,
        purchaseOrder: itemToDuplicate.fabInfo.purchaseOrder,
        fieldPrints: itemToDuplicate.fabInfo.fieldPrints
    },
      address: {
        street: itemToDuplicate.address.street,
        city: itemToDuplicate.address.city,
        state: itemToDuplicate.address.state,
        building: itemToDuplicate.address.building,
        area: itemToDuplicate.address.area
      }
    });

    // console.log('newEntry');
    // console.log(newEntry);
    await projectDBmodel.collection.insertOne(newEntry);

    //get updated data from mongoDB and push it to the clients
    const allItems = await projectDBmodel.find().exec();
    
    io.emit('pushData',allItems);
    console.log('hi');
    res.json({ message: "copy successful!" });
  } else {
    res.json({ message: "copy unsuccessful" });
  }
});

app.use("/form", async(req, res) => {
  // prints the recieved data to the console
  if (typeof req.body.formJson !== 'undefined') {
    console.log(req.body.formJson.ProjectNumber);
    
    const newEntry = new projectDBmodel({
      projectInfo: {
        projectNumber: req.body.formJson.ProjectNumber,
        projectName: req.body.formJson.ProjectName,
        department: req.body.formJson.Department,
        projectManager: req.body.formJson.ProjectManager,
        projectArea: req.body.formJson.ProjectArea
      },
      designInfo: {
        designer: req.body.formJson.Designer,
        hoursRemaining: req.body.formJson.DesignHours,
        priority: req.body.formJson.Priority,
        permitSubmital: req.body.formJson.SubmittalDate,
        listDate: req.body.formJson.listDate
      },
      fabInfo: {
        shipDate: '0',
        listNumber: 0,
        welds: 0,
        mains: 0,
        lines: 0,
        hangers: 0,
        sprinklers: 0,
        purchaseOrder: false,
        fieldPrints: ''
    },
      address: {
        street: req.body.formJson.Street,
        city: req.body.formJson.City,
        state: req.body.formJson.State,
        building: req.body.formJson.Building,
        area: req.body.formJson.Area
      }
    });
    
    console.log(newEntry);
    projectDBmodel.collection.insertOne(newEntry);
    res.json({ message: "Submission successful" });
  } else {
    res.json({ message: "Submission unsuccessful" });
  }
})

//deployment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if(process.env.NODE_ENV==='production') {
  app.use(express.static(path.join(__dirname,'../client/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
  })
} else {
  
}

//connect to mongodb
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('connected to mongodb'))
    .catch((error) => console.log(error.message));

//begin listening for requests the the avalable routes
httpServer.listen(PORT);