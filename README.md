#thethings.iO node mqtt examples
This package contains some examples that show how to interact with thetthings mqtt broker.

#Install
```
npm install thethingsio-mqtt
```

##thethings.iO MQTT borker

```
mqtt.thethings.io
```

###[complete-client.js](https://github.com/theThings/thethingsio-coap-node/tree/master/examples/complete-client.js)

This code activates a thing and subscribes to it's topic then you can write in the console the key-value pairs and observe the real-time data in the [panel](panel.thethings.io)

You can also combine the protocols and write with [http/s](https://github.com/theThings/thethingsio-api-node) or [CoAP](https://github.com/theThings/thethingsio-coap-node)
while you read the data with MQTT.

###[secure-client.js](https://github.com/theThings/thethingsio-coap-node/tree/master/examples/secure-client.js)
This example shows how to connect to the thethings.iO with ssl encryption.

###[last-will-client.js](https://github.com/theThings/thethingsio-coap-node/tree/master/examples/last-will-client.js)

Last will is a MQTT feature to tell the broker to notify when the device abruptly disconnects. This example shows you how to configure the broker to send a message when the device goes down.
