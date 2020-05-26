// define an array to hold our data.  Later this should be stored on the sever
Runs = [];

// Now comes the code that must wait to run until the document is fully loaded
document.addEventListener("DOMContentLoaded", function (event) {

    let checkboxList = document.getElementById("ViewRuns");
    UpdateDisplay(checkboxList);

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

 var deleteButton = document.getElementById('deleteButton');
 
 function removeElm(elm){
    elm.parentElement.removeChild(elm);
 }

deleteButton.addEventListener('click', function(){
   var rmvCheckBoxes = document.getElementsByName('delete');

    for(var i = 0; i < rmvCheckBoxes.length; i++)
    {
        if(rmvCheckBoxes[i].checked)
        {
            removeElm(rmvCheckBoxes[i]);    
        }
    }  
});
}); // end of document load function

function removeElm(elm){
    elm.parentElement.removeChild(elm);
 }

// our constructor
function Run(pDate, pTime, pMiles, pNotes) {
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
        checkbox.innerHTML = "<input type='checkbox' name='delete' id='deleteRun" + index + "'> <label for='deleteRun" + index + "'>" + item.date + ", " + item.time + ", " + item.miles + " miles, " + item.notes + "</label>"
   

    
    }); // end of adding check boxes
});  // end of call $.get


}  // end of function
