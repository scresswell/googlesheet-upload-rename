function myFunction() {

//The ID of the folder where the music has been uploaded
var driveID = '1n4BRsPstuRg25jEuqdH4hn_ZgvYKqCxz8R7uKAfBmNJxSXxEXTMlYAmGVbfAhsSaFsnUq4Zy';
console.log(driveID);

var folder = DriveApp.getFolderById(driveID);
var files = folder.getFiles();

//the google sheet where the responses are
//Note, the file has been manipulated to have the following columns
//Timestamp ; Name ; Category ; Music track link ;	Order
//'Order' is the performance order, which I add in before running the script
var sheet = SpreadsheetApp.getActive().getSheetByName("Form responses 1");
var data = sheet.getDataRange().getValues();

//Use this to build the string up so the script knows where to go in the for loop later
var endString = '/view?usp=drivesdk';

while (files.hasNext()) {
  var file = files.next();
  var file_url = file.getUrl();
  console.log(file.getName());

  var file_type = file.getMimeType();

  if ( file_type == 'audio/mpeg') {
    var extn = '.mp3'
  }
  if ( file_type == 'audio/wav') {
    var extn = '.wav'
  }
    

  data.forEach(function (row) {
  
    var check_url = row[3] + endString;
    check_url = check_url.replace('open?id=','file/d/')
    console.log(check_url);
    
    var newName = row[4] + ' - ' + row[1];
    
    console.log(newName);
    
    if ( check_url == file_url) {
      console.log('Check: ' + check_url);
      console.log('File: ' + file_url);
      console.log('new name: ' + newName);

      var modName = newName + extn;
      file.setName(modName);
    }
  });
}
}
