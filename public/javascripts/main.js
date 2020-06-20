// define an array to hold our data.  Later this should be stored on the sever
Runs = [];

// Now comes the code that must wait to run until the document is fully loaded
document.addEventListener("DOMContentLoaded", function (event) {

    let checkboxList = document.getElementById("ViewRuns");
    UpdateDisplay(checkboxList);

    let textarea = document.querySelector('#userAddsRun');
    let input = document.querySelector('#clear');

    input.addEventListener('click', function () {
        textarea.value = '';
    }, false);

 // add a button event for adding new notes on Add page
 document.getElementById("add_run").addEventListener("click", function () {
    // use constructor, build new object and put it in array
    Runs.push( new Run( document.getElementById("date").value, 
    document.getElementById("time").value,
    document.getElementById("miles").value, 
    document.getElementById("notes").value ));
    let newRun = new Run( document.getElementById("date").value, 
       document.getElementById("time").value,
       document.getElementById("miles").value,
       document.getElementById("notes").value ) ;
    console.log("about to hit ajax for addrun");

    $.ajax({
        url : "/AddRun",
        type: "POST",
        data: JSON.stringify(newRun),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success: function (result) {
            console.log(result);
            document.location.href = "index.html#View";  // go to this page to show item was added
        }
    });
 });

document.getElementById("deleteButton").addEventListener('click', function(){
    let which = document.getElementById("ViewRuns").value;
    let ID = 1;
    // call function to get all check boxes 
    var checkedBoxes = getCheckedBoxes("delete"); // get checkedBoxes
    console.log(checkedBoxes);
    // ajax to hit delete run route
    console.log("about to hit ajax for delete")
    $.ajax({
        type: "DELETE",
            url: "/DeleteRun/" + ID,
            success: function(result){
                console.log(result);
                document.location.href = "index.html#View";  // go to this page to show item was deleted
            },
            error: function (xhr, textStatus, errorThrown) {  
                console.log('Error in Operation');  
                alert("Run could not be deleted");
            }  
        });
});
}); // end of document load function

// need to write a function to store all items that are in a checkbox
// can store by index number, but have to take that out of the id
// or could do by grabbing item.date (but possibly have a bug if multiple items of the same date exist)
// https://stackoverflow.com/questions/8563240/how-to-get-all-checked-checkboxes

// Pass the checkbox name to the function
function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
       // And stick the checked ones onto an array...
       if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i]);
       }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }
  
function removeElm(elm){
    elm.parentElement.removeChild(elm);
 }


// our constructor

function Run(pDate, pTime, pMiles, pNotes) {
    this.ID = 1;
    this.date= pDate;
    this.time = pTime;
    this.miles = pMiles;
    this.notes = pNotes;
}



// this function is shared by Home and Delete page to add li's to which ever ul is passed in
 function UpdateDisplay(whichElement) {

    $.get("/getAllRuns", function(data, status){  // AJAX get
        Runs = data;  // put the returned server json data into our local array
        console.log("test");
        console.log(Runs);
 //   });

    whichElement.innerHTML = "";
    // sort by priority
    // Notes.sort(function(a, b) {
    //     return (a.priority) - (b.priority);
    
    Runs.forEach(function(item, index) {   // build one li for each item in array
        //var li = document.createElement('li');
        //whichElement.appendChild(li);

        var checkbox = document.createElement('checkbox');
        whichElement.appendChild(checkbox);

        //checkbox.innerHTML = "<input type ='checkbox'>" + item.date
        checkbox.innerHTML = "<input type='checkbox' name='delete' id='"+ item.notes +"'> <label for='" + item.notes + "'>" + item.date + ", " + item.time + " minutes, " + item.miles + " miles, " + item.notes + "</label>"
   
    
    }); // end of adding check boxes
});  // end of call $.get

function compareMilesRan(a, b){
    // a should come before b in the sorted order
    if(a.miles > b.miles){
            return -1;
    // a should come after b in the sorted order
    }else if(a.miles < b.miles){
            return 1;
    // and and b are the same
    }else{
            return 0;
    }
}

    // PR page code
    let personalRecords = document.getElementById("personal_records");
    UpdatePRDisplay(personalRecords);

    function UpdatePRDisplay(whichElement) {

        $.get("/getAllRuns", function(data, status){  // AJAX get
            Runs = data;  // put the returned server json data into our local array
            RunsByMileage = data;

            for(i = 0; i < RunsByMileage.length; i++){
                RunsByMileage[i].miles = parseInt(RunsByMileage[i].miles);
            }


            RunsByMileage.sort(compareMilesRan); // sort by miles ran
            console.log(RunsByMileage)
            console.log(RunsByMileage[0].miles)

            whichElement = document.getElementById("personal_records");

            whichElement.innerHTML = "";
           
            RunsByMileage.forEach(function(item, index) {   // build one li for each item in array
        
                var li = document.createElement("li");
                whichElement.appendChild(li);
                
                //li.innerHTML = 
                li.innerHTML = item.date + ", " + item.time + " minutes, " + item.miles + " miles, " + item.notes;

            });

    });
}};