var express = require('express');
var router = express.Router();

//Import Model
const TutionModel = require('../models/Tution')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add-student', function(req, res, next){
  res.render('add-student')
})

router.post('/add-student-process', function(req, res, next){
  var studentData = {
    name: req.body.txt1,
    class: req.body.txt2,
    age: req.body.txt3,
    contact: req.body.txt4
  }

  //Assign Data to Model
  var mydata = TutionModel(studentData)
  mydata.save()
  .then(()=> res.redirect("/display-student"))
  .catch((err)=> console.log(err))
})

router.get('/display-student', function(req, res, next){
  TutionModel.find()
  .then((mydata)=> {
    console.log(mydata)
    res.render('display-student', {mydata: mydata})
  })
  .catch((err)=> console.log(err))
})

router.get('/delete-student/:id', function(req, res, next){
  var myid = req.params.id

  TutionModel.findByIdAndDelete(myid)
  .then(()=> res.redirect("/display-student"))
  .catch((err)=> console.log(err))
})

router.get('/edit-student/:id', function(req, res, next){
  var myid = req.params.id

  TutionModel.findById(myid)
  .then((mydata)=> {
    res.render('edit-student', {mydata: mydata})
  })
  .catch((err)=> console.log(err))
})

router.post('/edit-student-process/:id', function(req, res, next){
  var myid = req.params.id
  var updatedData = {
    name: req.body.txt1,
    class: req.body.txt2,
    age: req.body.txt3,
    contact: req.body.txt4
  }

  TutionModel.findByIdAndUpdate(myid, updatedData)
  .then(()=> {
    res.redirect('/display-student')
  })
  .catch((err)=> {
    console.log(err)
    res.send("Error in Updating Student Data")
  }) 
  
})

module.exports = router;
