  var FCM = require('fcm-node');
    var serverKey = 'AAAA6zcz3cQ:APA91bEPkZ2Y32pbpoXtl153nvxV-UpT3oQw59Bj51U30Sx97ph5GeuxHF-Pu_j1w2rE_W1ST90jxUMr615qt1lcNmIxg8eeNOFbCSokz1S3VFlk5gLG1di4INkE9oyU9ifcH0PAwgEE'; //put your server key here 
    var fcm = new FCM(serverKey);
	var token= 'cYNY7yrPewg:APA91bFUBLS9Q0RrjgJfGpdIXpoWD9Fu7JRtAAZa6nwwniplxD1ma9Ig4iI9R_9b9OQ7ksYTR7gjw4MaoKUSfIaFMXLBsV3mEgBq0ikCayu2PGPSJm1vOQMswLSP3MCiMUdIP-mF0zD_';

 
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera) 
        to: token, 
        collapse_key: 'your_collapse_key',
        
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        
        data: {  //you can send only notification or only data(or include both) 
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });