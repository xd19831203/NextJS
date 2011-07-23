/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

require('NX');
require('should');
assert = require('assert');
require('../shared/env');

// }}}
// {{{ setup

var docRoot = './test/server/Action/';

// }}}
// {{{ Action Server Tests

module.exports = {

    // {{{ test action#pattern1

    'test action#pattern1': function(beforeExit) {

        NX.service({
            serverId: 'UnitTest0002',
            port: process.env.NXTestServerPort++,
            workers: false,
            enableDaemon: false,
            bootarg: 'start',
            execPath: docRoot,
            next: function() {

                var file = NX.Fs.readFileSync(docRoot + '/public/index.result.html').toString();
                var req = {
                    url: '/',
                    method: 'GET'
                };
                var res = {
                    //body: file,
                    status: 200
                }
                var cb = function(res) {
                   res.body.should.equal(file);
                    assert.ok(res);
                };

                assert.response(NX.servers['UnitTest0002'], req, res, cb);

            }
        });

    }

    // }}}

};

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
