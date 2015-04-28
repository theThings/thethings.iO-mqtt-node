var mqtt = require('mqtt')

var thingToken = 'aaa'  // CHANGE FOR a REAL THING TOKEN FROM the thethings.iO Panel https://developers.thethings.io/iot-panel.html
var thingTopic = 'v2/things/'+thingToken

var client = mqtt.connect({
    host:'mqtt.thethings.io',
    port:1883,
    will: {
        topic: thingTopic,
        payload: JSON.stringify({values:[{key:'LWT',value:'Device Last Will Testament'}]})
    }
})

client.on('connect',function(){
    console.log('connected to thethings.iO!')
    client.subscribe(thingTopic,function(err,granted){
        console.log('subscribe result for', thingTopic, err, granted)
        console.log('write your key value in the console:')
        console.log('Example:')
        console.log('fun',9000)
    })
})

client.on('message', function (topic, message) {
    message = JSON.parse(message)
    console.log('message',topic, message)
})

//this dependency is just for the example
var readline = require('readline')

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
})

rl.on('line', function (cmd) {
    var kv = cmd.split(' ')
    if(kv.length < 2) return
    var values = {values:[{key:kv[0].toString(), value:kv[1]}]}
    console.log('sending ',values,'to ',thingTopic)
    //publish your data
    client.publish(thingTopic,  JSON.stringify(values));
})