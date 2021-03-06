/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright (c)2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.smtp.Response

NX.define('NX.smtp.Response', {

    // {{{ requires

    requires: [
        'NX.smtp.Error'
    ],

    // }}}
    // {{{ statics

    statics: {

        // {{{ monitor

        monitor: require('./statics/monitor')

        // }}}

    },

    // }}}
    // {{{ constructor

    constructor: require('./constructor')

    // }}}

});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
