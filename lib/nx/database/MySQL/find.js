/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright (c)2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.database.MySQL.find

module.exports = function(table, o, fn) {

    var me = this,
        sql = '';

    // SQLビルド
    sql = me.buildSQL('select', table, o);

    // SQL実行
    me.driver.query(sql, fn);

};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
