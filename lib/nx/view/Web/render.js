/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright (c)2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.view.Web.render

module.exports = function(req, res, next) {

    var me = this,
        info = res.result,
        dumpinfo = res.$dump,
        rc = res.actionReturnConfig;

    // スーパークラスメソッドコール
    me.callParent(arguments);

    if(rc.render === false) {
        next();
        return;
    }

    var redirect = rc.redirect;

    // リダイレクト処理
    if(NX.isString(redirect)) {

        try {
            res.writeHead(302, {
                'Location': redirect
            });
        } catch(e){}

        res.end();

        next();

        return;
    }

    if(NX.isString(rc.template)) {
        me.paths.template = NX.Path.normalize(me.paths.templates + '/' + rc.template);
    }

    if(me.paths.template === false) {
        next();
        return;
    }

    if(NX.isObject(rc.render)) {

        var r = rc.render;
        var ext = r.ext;
        var data = r.data;
        var size = r.size;
        var maxAge = 0;
        var headers = {
            "Content-Type": NX.WebView.mimetype[ext]
        };

        res.writeHead(200, headers);
        res.end(data);

        next();

        return;
    }

    var tplpath = me.paths.template;

    me.loadFile(tplpath, function(err, data, stat, ext) {

        if(err) {

            switch(err.type) {

                case 'not found':

                    // 404エラー
                    res.$errorCode = 404;
                    me.error.call(me, req, res, next);

                return false;

                break;
            }
        }

        var display = function(data, size, useTpl) {

            var maxAge = 0;
            var headers = {
                "Content-Type": NX.WebView.mimetype[ext],
                "Content-Length": size,
                "Last-Modified": stat.mtime.toUTCString(),
                "Expires": "Thu, 01 Dec 1994 16:00:00 GMT",
                "Cache-Control": "no-cache, must-revalidate, post-check=0, pre-check=0",
                "Pragma": "no-cache",
                "ETag": NX.WebView.etag(stat)
            };

            if(!useTpl) {
                headers["Cache-Control"] = "public max-age=" + (maxAge / 1000);

                if(req.headers['if-modified-since']) {

                    NX.Fs.stat(tplpath, function(err, stat) {

                        stat = stat || {};

                        var httpdate = new Date(req.headers['if-modified-since']),
                            filetime = stat.mtime || new Date(1900, 1, 1);

                        if(httpdate >= stat.mtime) {
                            res.writeHead(304, headers);
                            res.end();
                        } else {
                            res.writeHead(200, headers);
                            res.end(data);
                        }

                        next();

                    });


                } else {

                    res.writeHead(200, headers);
                    res.end(data);
                    next();

                }

            } else {

                res.writeHead(200, headers);
                res.end(data);

                next();

            }

        };

        // テンプレート処理
        if(NX.Array.contains(me.tplExts, ext)) {

            var tpl = NX.create('NX.Template', me.paths);

            tpl.fetch(data.toString(), info, function(data) {

                if(dumpinfo && dumpinfo.length > 0) {

                    me.renderWithDump({
                        data: data,
                        info: dumpinfo,
                        req: req,
                        res: res
                    }, function(data) {
                        display(data, Buffer.byteLength(data, 'utf8'), true);
                    });

                } else {

                    var size = Buffer.byteLength(data, 'utf8');
                    display(data, size, true);

                }
            });

        } else {

            display(data, stat.size, false);

        }

    });
};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
