/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright (c)2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.server.Worker.startServer

module.exports = function(fd) {

    var me = this;

    // ミドルウェア定義
    var middleware = [
        NX.server.Server.bodyParser(),
        NX.server.Server.cookieParser(),
        NX.server.Server.sessionProvider(me.config.session),
        NX.server.Server.requestParser(me.config),
        NX.server.Server.multipartParser(),
        NX.Dispatcher.dispatch()
    ];

    if(this.config.serverType === 'https') {

        key = me.config.key;
        cert = me.config.cert;

        var o = {
            key: key,
            cert: cert
        };

        if(me.config.ca) {
            o.ca = me.config.ca;
        }

        // HTTPSサーバー生成
        (new NX.server.Https(middleware, o)).listenFD(fd);

    } else {

        // HTTPサーバー生成
        (new NX.server.Http(middleware)).listenFD(fd);

    }

    console.log('Worker Ready: ' + process.pid);

};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */