// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}!`)
}

// Add a GET route at the /data endpoint that sends projectData object as a response
app.get('/data', (req,res) => {
    console.log(req.body);
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    res.send(projectData);
    
});

app.post('/data', addEntry);

function addEntry(req,res){
    newEntry = {
        temperature : req.body.temperature,
        date : req.body.date,
        userResponse : req.body.userResponse
    }

    projectData.push(newEntry);
    res.send(projectData);
    console.log(projectData);
    
}
