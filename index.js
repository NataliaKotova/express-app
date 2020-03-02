const express = require('express');
const app = express();//top-level function of express

const path = require('path');
const apiData = require('./people.json');
const apiDataCars = require('./cars.json');
const carOwners = require('./car-owners.json');

const port = 3000;

app.use((req,res,next)=>{
  console.log(`${req.method} request for ${req.url} `);
  next();
})

//used to send a default message before routing
// app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.static('public'));//all files from public folder must be included
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/popper', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')));
app.use('/js', express.static(path.join(__dirname,'public/js')));
app.use('/css', express.static(path.join(__dirname,'public/css')));

// set the route for index.html
app.get('/', (req,res,)=>{
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// set the route for about.html
app.get('/about', (req,res,)=>{
  res.sendFile(path.join(__dirname+'/public/about.html'));
});
//give access to apiData
app.get('/people', (req,res,)=>{
  res.json(apiData);
});

app.get('/cars', (req,res,)=>{
  res.json(apiDataCars);
});

app.get('/carowners', (req,res,)=>{
  res.json(carOwners);
});

app.get('/carowners/fname=:first_name',(req,res)=>{
  const nameParam = req.params.first_name;
  let ownersFilteredArray = [];//array to push the matching objects to user's value
    for (let i = 0; i < carOwners.length; i++) {
      if ((nameParam.toLowerCase() === carOwners[i].first_name.toLowerCase())) {
        ownersFilteredArray.push(carOwners[i]);
      }
    }
    res.send(ownersFilteredArray);
    {
      res.send('Invalid parameter');
    }
});

app.get('/carowners/fname=:first_name/carname=:owns_car',(req,res)=>{
  const nameParam = req.params.first_name;
  const carParam = req.params.owns_car; //retrieves the parameter value requested by the user
  // if ((modelParam === 'male') || (genderParam === 'female')){
    let ownersFilteredArray = [];//array to push the matching objects to user's value
    for (let i = 0; i < carOwners.length; i++) {
      if ((nameParam.toLowerCase() === carOwners[i].first_name.toLowerCase()) && (carParam.toLowerCase() === carOwners[i].owns_car.toLowerCase())){
        ownersFilteredArray.push(carOwners[i]);
      }
    }
    res.send(ownersFilteredArray);
    {
      res.send('Invalid parameter');
    }
});

app.get('/cars/make=:make&model=:model',(req,res)=>{
  const makeParam = req.params.make;
  const modelParam = req.params.model; //retrieves the parameter value requested by the user
  // if ((modelParam === 'male') || (genderParam === 'female')){
    let filteredArray = [];//array to push the matching objects to user's value
    for (let i = 0; i < cars.length; i++) {
      if ((modelParam.toLowerCase() === cars[i].car_model.toLowerCase()) && (makeParam.toLowerCase() === cars[i].car_make.toLowerCase())){
        filteredArray.push(cars[i]);
      }
    }
    res.send(filteredArray);
    {
      // res.send('Invalid parameter');
    }
});


app.listen(port, () => console.log(`This app is listening on port ${port}!`))
