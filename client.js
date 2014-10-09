var mqtt = require('mqtt')
    , events = require('events')
    , util = require('util');

var Client = module.exports = function Client(config) {
    if (!(this instanceof Client)) {
        return new Client(config);
    }

    var that = this;
    var options = {clientId: config.USER_TOKEN + '|' + config.THING_TOKEN,
        username: config.TOPIC_USER_TOKEN,
        password: config.TOPIC_THING_TOKEN };

    this.mqttCli = mqtt.createClient(1883, 'mqtt.thethings.io', options);

    this.topic = 'public/' + config.TOPIC_USER_NAME + '/' + config.TOPIC_THING_NAME;

    events.EventEmitter.call(this);

    this.mqttCli.on('connect', function () {
        that.emit('connect');
    });

    this.mqttCli.on('message', function (topic, message) {
        that.emit('message', topic, message);
    });
}

util.inherits(Client, events.EventEmitter);

Client.prototype.subscribe = function (topic) {
    if (topic === undefined) {
        topic = this.topic;
    }
    this.mqttCli.subscribe(topic);
}

Client.prototype.publish = function (message) {
    this.mqttCli.publish(this.topic, message);
    return this;
}