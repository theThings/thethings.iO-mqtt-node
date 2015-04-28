//Example to activate a client at thethings.iO platform
//Note: the activation code shall not be used instead, you can set the
//thingToken directly

//Usage: write key-value pairs in the console

var mqtt = require('mqtt')

var activationCode = 'one of your activation codes'//you should change this
var thingToken = null //you can add a thingToken too if don't have an activation code

var client = mqtt.connect({
  host:'mqtt.thethings.io',
  port:1883
  })

var activationTopic = 'v2/activations/'+activationCode+'/'+Math.random()
var thingTopic = 'v2/things/'+thingToken

client.on('connect',function(){
  console.log('connected to thethings.iO!')
  if(!thingToken){
    client.subscribe(activationTopic,function(err,granted){
      console.log('subscribe result for', activationTopic, err, granted)
    })
  }else{
    client.subscribe(thingTopic,function(err,granted){
      console.log('subscribe result for', thingTopic, err, granted)
      console.log('write your key value in the console:')
      console.log('Example:')
      console.log('fun',9000)
    })
  }
})

client.on('message', function (topic, message) {
    message = JSON.parse(message)
    console.log('message',topic, message)
    if(topic === activationTopic){
      console.log('activation')
      if(message.status === 'error'){
        console.error('failed to activate your thing')
        console.error(message.message)
        process.exit(1)
      }
      console.log('thing activated, hurray!')
      thingToken = message.thingToken
      thingTopic = 'v2/things/'+thingToken
      client.subscribe(thingTopic)
      console.log('write your key value in the console:')
      console.log('Example:')
      console.log('fun',9000)
    }
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
