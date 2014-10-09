/**
 * Example client using node thethings.io lib
 */
var theThingsMqtt = require('../');

var config = {
    "USER_TOKEN" : "your user token",
    "THING_TOKEN" : "your thing token",
    "TOPIC_USER_TOKEN" : "the user token from the user you want to publish (can be your user token)",
    "TOPIC_THING_TOKEN" : "the thing token from the thing you want to publish (can be your thing token)",
    "TOPIC_USER_NAME" : "the user name from the user you want to publish (can be your user name)",
    "TOPIC_THING_NAME" : "the thing name from the thing you want to publish (can be your thing name)"
}

var client = theThingsMqtt.createClient(config);

client.on('connect', function () {
    client.subscribe('public/user name/thing name');
    //client.subscribe('public/user name2/thing name2');
    //you can subscribe to more than one channel
});

client.on('message', function (topic, message) {
    console.log(topic, message);
});

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

rl.on('line', function (cmd) {
    client.publish(cmd);
});