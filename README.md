#theThings.IO node mqtt lib
This lib allows to connect to the mqtt.theThings.IO broker.

#Install
```

npm install thethingsio-mqtt
```

##Getting started

You can put your credentials in a file called config.json with this format:

```js
{
    "USER_TOKEN" : "your user token",
    "THING_TOKEN" : "your thing token",
    "TOPIC_USER_TOKEN" : "the user token from the user you want to publish (can be your user token)",
    "TOPIC_THING_TOKEN" : "the thing token from the thing you want to publish (can be your thing token)",
    "TOPIC_USER_NAME" : "the user name from the user you want to publish (can be your user name)",
    "TOPIC_THING_NAME" : "the thing name from the thing you want to publish (can be your thing name)"
}
```

The following code connects to theThings.IO mqtt broker and subscribes to the default topic /public/TOPIC_USER_NAME/TOPIC_THING_NAME

```js

var theThingsMqtt = require('thethingsio-mqtt');

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
```

You can subscribe as many topics as you want just calling:
```js
   client.subscribe(topicname);
```

It's recommended to put the subscriptions inside the client.on('connect') because when the client reconnects
automatically auto resubscribe too.


It is also possible to load a different config file passing the path whe creating the client.
```js
   client.subscribe('path/to/different/config/file.json);
```

Finally you can pass a configuration object as a parameter.

```js

    var config = {
        "USER_TOKEN" : "your user token",
        "THING_TOKEN" : "your thing token",
        "TOPIC_USER_TOKEN" : "the user token from the user you want to publish (can be your user token)",
        "TOPIC_THING_TOKEN" : "the thing token from the thing you want to publish (can be your thing token)",
        "TOPIC_USER_NAME" : "the user name from the user you want to publish (can be your user name)",
        "TOPIC_THING_NAME" : "the thing name from the thing you want to publish (can be your thing name)"
    }
   var client = theThingsMqtt.createClient(config);
```
