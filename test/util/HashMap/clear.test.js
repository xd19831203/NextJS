/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright (c)2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

require('should');
var assert = require('assert');

var T_UTIL_HASHMAP = require('NX/util/HashMap');

// }}}
// {{{ clear

module.exports = {

    // {{{ test clear#pattern1

    'test clear#pattern1': function() {

        var hm = new NX.util.HashMap();

        var ret = hm.add('key1', 'value1');

        hm.getCount().should.equal(1);

        hm.clear();

        hm.getCount().should.equal(0);

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