/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright (c)2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.util.tpl.Foreach.get

module.exports = function() {

    var me = this, parent = me.parent;

    var op = me.op.substring(parent.ldelim.length);
        op = op.substring(0, op.length - parent.rdelim.length);
        op = op.split(' ');

    var config = {};

    NX.iterate(op, function(item, i) {

        if(i == 0) {
            return;
        }

        //var t = NX.explode('=', item);
        var t = item.split('=');

        // TODO:trim
        config[t[0]] = t[1];

    });

    eval('var loop = me.bind.' + config.from);

    var html = '';

    // ネストしたforeachを持たないテンプレートの場合
    var elseText = '';

    if(me.v.indexOf(parent.ldelim + 'foreach ') === -1) {

        // foreachelseがある場合分割
        var v = me.v.split((parent.ldelim + 'foreachelse' + parent.rdelim));

        if(v.length > 1) {
            elseText = v[1];
        }

        me.v = v[0];
    }

    if(NX.isDefined(loop) && NX.isIterable(loop)) {

        NX.iterate(loop, function(item, key) {

            var tpl = new NX.Template(parent.initialConfig);
            var bind = {};

            bind[config.item] = item;
            bind[config.key] = key;

            html += tpl.fetch(me.v, bind);

        });

    } else {

        var tpl = new NX.Template(parent.initialConfig);
        var bind = me.bind;

        html += tpl.fetch(elseText, bind);
    }

    return html;
};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */