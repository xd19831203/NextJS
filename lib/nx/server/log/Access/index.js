/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright (c)2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.server.log.Access

NX.define('NX.server.log.Access', {

    // {{{ singleton

    singleton: true,

    // }}}
    // {{{ extend

    extend: 'NX.server.log.Abstract',

    // }}}
    // {{{ init

    init: require('./init'),

    // }}}
    // {{{ output

    output: require('./output')

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
