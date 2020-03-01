const express = require('express');
const app = express();//top-level function of express
// const path = require('path');

const path = require('path');
const apiData = require('./people.json');

const port = 3000;
app.use((req,res,next)=>{
  console.log(`${req.method} request for ${req.url} `);
  next();
})
//Used to send a default msg before rooting.
// app.get('/', (req, res) => res.send('Hello World!'));
app.use(express.static('public')); // accessing public folder

//Set the root for index.html
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

//Set the root for about
app.get('/about', (req,res)=>{
  res.sendFile(path.join(__dirname+'/public/about.html'));
});

//give access to apiData
app.get('/people', (req,res)=>{
  res.json(apiData);
});

app.listen(port, () => console.log(`This app is listening on port ${port}!`));
