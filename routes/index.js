var express = require('express');
var router = express.Router();

var fs = require("fs");

fileManager = {
  read: function() {
    let rawdata = fs.readFileSync('runData.json');
    let goodData = JSON.parse(rawdata);
    console.log(goodData);
    ServerRuns = goodData; 
  },
  write: function() {
    let data = JSON.stringify(ServerRuns);
    fs.writeFileSync('runData.json', data);
  }
}

ServerRuns = [];

// our constructor
function Run(pDate, pTime, pMiles, pNotes) {
  this.date = pDate;
  this.time = pTime;
  this.miles = pMiles;
  this.notes = pNotes;
}
fileManager.read();
fileManager.write();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  fileManager.read();
  res.sendFile("./public/");
});


/* GET All runs data */
router.get('/getAllRuns', function(req, res) {
  res.status(200).json(ServerRuns);
});



/* Add one new run */
router.post('/AddRun', function(req, res) {
  const newRun = req.body;
  ServerRuns.push(newRun);
  fileManager.write();
  res.status(200).json(newRun);
});

// delete run
router.delete('/DeleteRun/', (req, res) => {
  // need to remove object from run array
  //const delDate = req.params.date;
  delete ServerRuns[0]
  let formatRunsForComparisonArray = [];
  for(var i = 0; i < ServerRuns.length; i++) // find the match
  {
    formatRunsForComparisonArray[i] = ServerRuns[i].date + ", " + ServerRuns[i].time + ", ";

      if(ServerRuns[i].date === date){ // checking match by date, but we can delete by index
        ServerRuns.splice(i,1);  // remove object from array
        fileManager.write();
          found = true;
          break;
      }
  }
});

module.exports = router;
