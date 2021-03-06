/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright (c)2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.server.Http.constructor

module.exports = function(stack) {

    // httpインプリメント
    NX.server.Http.implement(require('http'));

    var stack = this.stack = stack || [];

    // サーバー生成
    var ret = this.createServer(function(req, res) {

        var idx = 0;

        function next(err) {
            var layer = stack[idx++];
            if(layer) {
                layer(req, res, next);
            }
        }
        next();
    });

    return ret;

};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
