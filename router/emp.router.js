const express = require('express');

//object refs for express router
const empRoute = express.Router();

let Emp = require('../model/emp.model');

//http get() request = to read all data

empRoute.route('/').get(function (req, res) {
  Emp.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.render('index.ejs', { empInfo: data });
    }
  });
});

//get request for create new employee data
empRoute.route('/create').get(function (req, res) {
  res.render('create.ejs');
});
//post request 
empRoute.route('/add').post(function (req, res) {
  let data = new Emp(req.body);
  console.log(data);
  data.save().then(emp => {
    // res.status(200).json({ response: 'Employee data created successfully' });
    res.redirect('/');
  })
    .catch(err => {
      res.status(400)
        .json({ response: 'Unable to save a data in database' });
      res.redirect('/');
    })
});
//get req for edit data
empRoute.route('/edit/:id').get(function (req, res) {
  //to read id from url
  let id = req.params.id;
  Emp.findById({ _id: id }, function (err, data) {

    res.render('edit.ejs', { emp: data });
  });
});

//put req for updating existing data
empRoute.route('/update/:id').post(function (req, res) {
  let id = req.params.id;
  // let data = new Emp(req.body);
  // console.log('updating new data =', data);
  Emp.findById({ _id: id }, function (err, data) {
    if (!data) {
      res.status(400).send('no data found');
    }
    else {
      data.name = req.body.name;
      data.gender = req.body.gender;
      data.empid = req.body.empid;
      data.mobile = req.body.mobile;
      data.salary = req.body.salary;

      data
        .save()
        .then(mydata => {
          res.redirect('/');
        })
        .catch(err => {
          res.status(400).send('unable to update values');
        });
    }
  });
});
//DELETE REQEST
empRoute.route('/delete/:id').get(function (req, res) {
  let id = req.params.id;
  Emp.findByIdAndDelete({ _id: id }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = empRoute;

