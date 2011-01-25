/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ require core class

NX = require('./NX.js');

// }}}
// {{{ namespace

NX.ns(
    'NX.config',
    'NX.console',
    'NX.controller',
    'NX.fs',
    'NX.module',
    'NX.module.adapter',
    'NX.server',
    'NX.util',
    'NX.util.template',
    'NX.view'
);

// }}}


require('./config/DatabaseConfig.js');
require('./config/SessionConfig.js');
require('./config/HttpConfig.js');
require('./config/ViewConfig.js');
require('./config/ControllerConfig.js');

require('./util/DelayedTask.js');
require('./util/Deferred.js');
require('./util/Functions.js');
require('./util/Service.js');
require('./util/FileSystem.js');

NX.util.String = require('./util/String.js');
NX.util.JSON = require('./util/JSON.js');


require('./util/MarkDown.js');
require('./util/Template.js');
require('./util/template/TextNode.js');
require('./util/template/Foreach.js');
require('./util/Event.js');

NX.util.Observable = require('./util/Observable.js');

require('./util/MixedCollection.js');
require('./util/Format.js');

require('./server/AbstractDispatcher.js');
require('./server/Dispatcher.js');

NX.server.HttpServer = require('./server/HttpServer.js');


require('./controller/AbstractController.js');
require('./controller/WebController.js');
require('./controller/WebSocketController.js');
require('./controller/Action.js');
require('./controller/DirectAction.js');

require('./module/AbstractModule.js');
require('./module/Module.js');
require('./module/Connection.js');
require('./module/adapter/AbstractAdapter.js');
require('./module/adapter/MySQL.js');

require('./view/AbstractView.js');
require('./view/ConsoleView.js');
require('./view/WebView.js');



// {{{ NX class shorthand

/**
 * @class NX
 */

// }}}
// {{{ NX.encode

/**
 * @method encode
 */
NX.encode = NX.util.JSON.encode;

// }}}
// {{{ NX.decode

/**
 * @method decode
 */
NX.decode = NX.util.JSON.decode;

// }}}
// {{{ NX.str

NX.str = NX.util.String;

// }}}
// {{{ explode

/**
 * @method explode
 */
NX.explode = NX.util.String.explode;

// }}}
// {{{ implode

/**
 * @method implode
 */
NX.implode = NX.util.String.implode;

// }}}
// {{{ sprintf

/**
 * @method sprintf
 */
NX.sprintf = NX.util.String.sprintf;

// }}}
// {{{ NX.createServer

/**
 * @method createServer
 */
NX.createServer = NX.server.HttpServer.create;

// }}}
// {{{ NX.env

NX.env = NX.fs.pathinfo(module.parent.filename);
NX.env.libdir = __dirname;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */