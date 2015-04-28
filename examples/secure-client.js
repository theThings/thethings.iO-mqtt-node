var mqtt = require('mqtt')
    , fs = require('fs')

var thingToken = 'aaa'  // CHANGE FOR a REAL THING TOKEN FROM the thethings.iO Panel https://developers.thethings.io/iot-panel.html
var thingTopic = 'v2/things/'+thingToken

// Intermediate and root certificates chain to validate *.thethings.io domain
var CA_INTERM = [
    fs.readFileSync(__dirname + '/certs/COMODORSAOrganizationValidationSecureServerCA.pem')
    , fs.readFileSync(__dirname + '/certs/COMODORSAAddTrustCA.pem')
    , fs.readFileSync(__dirname + '/certs/AddTrustExternalCARoot.crt')
]

var client = mqtt.connect({
    port: 8883,
    protocol : 'mqtts',
    host: 'mqtt.thethings.io',
    ca : CA_INTERM,
    rejectUnauthorized: true
})

client.on('connect', function(){
    console.log('connected to thethings.iO with security ;)')
    client.subscribe(thingTopic, function(err, granted){
        console.log('subscribe result for', thingTopic, err, granted)
        console.log('write your key value in the console:')
        console.log('Example:')
        console.log('fun', 25)
    })
})

client.on('message',function(topic, message){
    message = JSON.parse(message)
    console.log('message', topic, message)
})

client.on('error',function(err){
    console.error('client error', err)
    console.error(err.stack)
})

//this dependency is just for this example. Next code lets you write in the console the key-value pairs to store at
//thethings.io Ex: fun 23
var readline = require('readline')

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
})

rl.on('line', function (cmd) {
    var kv = cmd.split(' ')
    if(kv.length < 2) return
    var values = {values:[{key:kv[0].toString(), value:Number(kv[1])}]}
    //publish your data
    client.publish(thingTopic,  JSON.stringify(values),function(ok){
        console.log('published', ok , JSON.stringify(values))
    });
})