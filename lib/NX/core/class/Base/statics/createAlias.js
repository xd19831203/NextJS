/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright (c)2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ requires

var flexSetter = require('../../../lang/Function').flexSetter;

// }}}
// {{{ NX.Base.createAlias

var $METHOD = module.exports = flexSetter(function(alias, origin) {
    this.prototype[alias] = this.prototype[origin];
});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */