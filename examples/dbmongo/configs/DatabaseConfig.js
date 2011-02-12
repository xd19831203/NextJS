/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ DatabaseConfig

module.exports = {

    // {{{ connections

    connections : {
        default: {
            name: 'default',
            adapter: 'mongo',
            host: 'localhost',
            user: '',
            password: '',
            database: 'nxsample',
            port: '27017'
        }
    }

    // }}}

};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
