/**
 * Example client using node thethings.io lib
 */
var theThingsMqtt = require('../');

var configFile = require('path').dirname(require.main.filename) + '/config.json';

var client = theThingsMqtt.createClient(configFile);

client.on('connect', function () {
    client.subscribe('public/user name/thing name');
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