/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ app

module.exports = NX.extend(NX.WebController, {

    // {{{ use

    use : [
        'users',
    ],

    // }}}
    // {{{ index

    index : function(req, res) {

        var me = this;

        // DB・テーブル仕様取得
        me.users.getSpec(function(info) {
            me.set('info', info);

            // ユーザー追加
            me.users.add(function() {


                me.end();
            });

        });

    }

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
