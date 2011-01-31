/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

require('NX');
var assert = require('assert'),
    http = require('http'),
    fs = require('fs'),
    helpers = require('../helpers');

// }}}
// {{{ exception Tests

var srv = NX.createServer({
    servers: [{
        port: process.NXEnv.testport,
        path: __dirname + '/exception/'
    }]
});

srv.listen();

module.exports = {

    // {{{ test exception#standerd

    'test controller#standerd': function(beforeExit) {

        var file;

        srv.servers[0].server.assertResponse('GET', {path: '/', accept: 'text/html'}, 500);

    },

    // }}}
    // {{{ test exception#json

    'test exception#json': function(beforeExit) {

        srv.servers[0].server.assertResponse('GET', {path: '/', accept: 'application/json'}, 500);

    },

    // }}}
    // {{{ test exception#unknown

    'test exception#unknown': function(beforeExit) {

        srv.servers[0].server.assertResponse('GET', {path: '/', accept: 'xxxxx'}, 500);

    }

    // }}}

};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */