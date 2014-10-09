/**
 * Example client using node thethings.io lib
 */
var theThingsMqtt = require('../');

//connect using the configuration in ./config.json
var client = theThingsMqtt.createClient();

//called when the client connects successfully to the broker
client.on('connect',function(){
    //subscribe to the default topic
    client.subscribe();
});

//called when a message arrives
client.on('message', function(topic,message){
    console.log(topic, message);
});

var readline = require('readline');

//wait for user input
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

//when the user inputs something publish to the default topic
rl.on('line', function (cmd) {
    client.publish(cmd);
});