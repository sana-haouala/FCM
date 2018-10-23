var firebase = require('firebase-admin');
//var request = require('request');
var MySQLEvents = require('mysql-events');
var API_KEY = "AAAA6zcz3cQ:APA91bEPkZ2Y32pbpoXtl153nvxV-UpT3oQw59Bj51U30Sx97ph5GeuxHF-Pu_j1w2rE_W1ST90jxUMr615qt1lcNmIxg8eeNOFbCSokz1S3VFlk5gLG1di4INkE9oyU9ifcH0PAwgEE"; // Your Firebase Cloud Messaging Server API key

// Fetch the service account key JSON file contents
var serviceAccount = require("path/to/serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
// firebase.initializeApp({
  // credential: firebase.credential.cert(serviceAccount),
  // databaseURL: "https://<your database>.firebaseio.com/"
// });
// ref = firebase.database().ref();

//Instantiate and create a database connection
var dsn = {
  host:     'localhost',
  user:     'root',
  password: ''
};
var myCon = MySQLEvents(dsn);

var watcher =mysqlEventWatcher.add(
  'myDB.table.field.value',
  function (oldRow, newRow, event) {
     //row inserted 
    if (oldRow === null) {
      //insert code goes here 
    }
 
     //row deleted 
    if (newRow === null) {
      //delete code goes here 
    }
 
     //row updated 
    if (oldRow !== null && newRow !== null) {
      sendNotificationToUser(
	  request.username, 
      request.message,
      function() {
        requestSnapshot.ref.remove();
      }
    );
    }
 
    //detailed event information 
    //console.log(event) 
  }, 
  'match this string or regex'
);

// function listenForNotificationRequests() {
  // var requests = ref.child('notificationRequests');
  // requests.on('child_added', function(requestSnapshot) {
    // var request = requestSnapshot.val();
    // sendNotificationToUser(
      // request.username, 
      // request.message,
      // function() {
        // requestSnapshot.ref.remove();
      // }
    // );
  // }, function(error) {
    // console.error(error);
  // });
// };

function sendNotificationToUser(username, message, onSuccess) {
  request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type' :' application/json',
      'Authorization': 'key='+API_KEY
    },
    body: JSON.stringify({
      notification: {
        title: message
      },
      to : '/topics/user_'+username
    })
  }, function(error, response, body) {
    if (error) { console.error(error); }
    else if (response.statusCode >= 400) { 
      console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage); 
    }
    else {
      onSuccess();
    }
  });
}

// start listening
// listenForNotificationRequests();
console.log('Server running at http://127.0.0.1:1337/');