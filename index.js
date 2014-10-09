function parseConfig(conf) {
    var config = {};
    if (conf.hasOwnProperty('USER_TOKEN')) {
        config.USER_TOKEN = conf.USER_TOKEN;
    } else {
        throw 'USER_TOKEN not defined';
    }
    if (conf.hasOwnProperty('THING_TOKEN')) {
        config.THING_TOKEN = conf.THING_TOKEN;
    } else {
        throw 'THING_TOKEN not defined';
    }
    if (conf.hasOwnProperty('TOPIC_USER_TOKEN')) {
        config.TOPIC_USER_TOKEN = conf.TOPIC_USER_TOKEN;
    } else {
        config.TOPIC_USER_TOKEN = conf.USER_TOKEN;
    }
    if (conf.hasOwnProperty('TOPIC_THING_TOKEN')) {
        config.TOPIC_THING_TOKEN = conf.TOPIC_THING_TOKEN;
    } else {
        config.TOPIC_THING_TOKEN = conf.THING_TOKEN;
    }

    if (conf.hasOwnProperty('TOPIC_THING_NAME')) {
        config.TOPIC_THING_NAME = conf.TOPIC_THING_NAME;
    } else {
        throw 'TOPIC_THING_NAME not defined';
    }

    if (conf.hasOwnProperty('TOPIC_USER_NAME')) {
        config.TOPIC_USER_NAME = conf.TOPIC_USER_NAME;
    } else {
        throw 'TOPIC_USER_NAME not defined';
    }
    return config;
}

function readFile(file) {
    var fs = require('fs');
    var data = fs.readFileSync(file, 'utf8')
    if (data === undefined) {
        throw 'Error: file ' + file + ' not found.';
    }
    return JSON.parse(data);
}

module.exports.createClient = function (file) {
    var config = {};
    if (file === undefined) {
        config = parseConfig(readFile(require('path').dirname(require.main.filename) + '/config.json'));
    } else if (typeof file === 'string') {
        config = parseConfig(readFile(file));
    } else {
        config = parseConfig(file);
    }
    var cli = require('./client')(config);
    return cli;
}
