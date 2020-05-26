var express = require('express');
var router = express.Router();

ServerRuns = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile("./public/");
});

// our constructor
function Run(pDate, pTime, pMiles, pNotes) {
  this.date = pDate;
  this.time = pTime;
  this.miles = pMiles;
  this.notes = pNotes;
}


/* GET All runs data */
router.get('/getAllRuns', function(req, res) {
  res.status(200).json(ServerRuns);
});



/* Add one new run */
router.post('/AddRun', function(req, res) {
  const newRun = req.body;
  ServerRuns.push(newRun);
  res.status(200).json(newRun);
});


router.delete('/DeleteRun/', (req, res) => {
  for(var i = 0; i < rmvCheckBoxes.length; i++)
  {
      if(rmvCheckBoxes[i].checked)
      {
          removeElm(rmvCheckBoxes[i]);    
      }
  }  
});

module.exports = router;
