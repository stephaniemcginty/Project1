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
var lastID = 1;

// our constructor
function Run(pDate, pTime, pMiles, pNotes) {
  this.ID = lastID++;
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
 // newRun.ID = lastID++;
  ServerRuns.push(newRun);
  fileManager.write();
  res.status(200).json(newRun);
});

// delete run
// receive id of data to delete
// translate id into index and delete from array
router.delete('/DeleteRun/:ID', (req, res) => {
  // need to remove object from run array
  //const delDate = req.params.date;
  //delete ServerRuns[0]
  console.log("test delete route");
  let found = false;
  const delID = req.params.ID;
  console.log(ID);

  //let formatRunsForComparisonArray = [];
  for(var i = 0; i < ServerRuns.length; i++) // find the match
  {
    //formatRunsForComparisonArray[i] = ServerRuns[i].date + ", " + ServerRuns[i].time + ", ";

      if(ServerRuns[i].ID == delID){ // checking match by date, but we can delete by index
        console.log(ServerRuns[i].ID);
        ServerRuns.splice(i,1);  // remove object from array
        //fileManager.write();
          found = true;
          break;
      }
  }
  if (!found) {
    console.log("not found");
    return res.status(500).json({
      status: "error"
    });
  } else {
  res.send('Run deleted!');
  }
});

module.exports = router;
