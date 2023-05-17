import dotenv from 'dotenv';
dotenv.config();
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
  console.log('connected');
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
    //console.log("editing: " + req.body.columnEdited + " to a value of "+req.body.value+" in the item id "+req.body._id);
    //if edited content is in the projectInfo update here
    if(req.body.columnEdited==='projectName' || req.body.columnEdited==='projectNumber' || req.body.columnEdited==='department' || req.body.columnEdited==='projectManager' || req.body.columnEdited==='projectArea') {
      console.log("editing: " + req.body.columnEdited + " to a value of "+req.body.value+" in the item id "+req.body._id);
      const info = {};
      info['projectInfo.'+req.body.columnEdited] = req.body.value;
      //console.log(info);
      await projectDBmodel.findByIdAndUpdate(req.body._id, info);
      
      console.log('pushing data');
      const allItems = await projectDBmodel.find().exec();
      io.emit('pushData',allItems);
      res.json({ message: "edit successful!" });

    } else if (req.body.columnEdited==='designer' ||req.body.columnEdited==='hoursRemaining' ||req.body.columnEdited==='priority' || req.body.columnEdited==='permitSubmittal' || req.body.columnEdited==='listDate') {
      console.log("editing: " + req.body.columnEdited + " to a value of "+req.body.value+" in the item id "+req.body._id);
      const info = {};
      info['designInfo.'+req.body.columnEdited] = req.body.value;
      //console.log(info);
      await projectDBmodel.findByIdAndUpdate(req.body._id, info);
      //console.log('pushing data');
      //io.emit('pushData');
      res.json({ message: "edit successful!" });
    };
  } else {
    res.json({ message: "edit unsuccessful" });
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
  res.send('failed to find path');
}

//connect to mongodb
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('connected to mongodb'))
    .catch((error) => console.log(error.message));

//begin listening for requests the the avalable routes
httpServer.listen(PORT);