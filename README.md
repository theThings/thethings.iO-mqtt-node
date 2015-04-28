#thethings.iO Node.js MQTT examples
This package contains some examples that show how to interact with thethings.iO MQTT broker.

#Install
```
npm install thethingsio-mqtt
```

##thethings.iO MQTT broker

```
mqtt.thethings.io
```

###[complete-client.js](https://github.com/theThings/thethingsio-mqtt-node/tree/master/examples/complete-client.js)

This code activates a thing and subscribes to its topic. Then you can write in the console the key-value pairs and observe the real-time data at the [panel](panel.thethings.io)

You can also combine the protocols and write with [HTTP/S](https://github.com/theThings/thethingsio-api-node) or [CoAP](https://github.com/theThings/thethingsio-coap-node)
while you read the data with MQTT.

###[secure-client.js](https://github.com/theThings/thethingsio-mqtt-node/tree/master/examples/secure-client.js)
This example shows how to connect to the thethings.iO with SSL encryption. You need a thingToken from a previously
activated thing, the complete-client.js example shows to you how to activate a thing with MQTT.

We also provide to you the necesary chain of certificates to trust our domain.


###[last-will-client.js](https://github.com/theThings/thethingsio-mqtt-node/tree/master/examples/last-will-client.js)

Last will is a MQTT feature to tell the broker to send a message when the device abruptly disconnects. This example shows
you how to configure the broker to send a message when the device goes down.