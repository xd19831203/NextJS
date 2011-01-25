/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS
 * Copyright(c) 2006-2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ NX.Action

/**
 * @class NX.Action
 */
NX.Action = NX.extend(NX.util.Observable, {

    // {{{ execute

    execute : function() {

    },

    // }}}
    // {{{ set

    /**
     * @method set
     */
    set : function(key, v) {

        var me = this;

        me.controller.results[key] = v;
    },

    // }}}
    // {{{ end

    end : function(res) {

        var me = this;

        me.controller.fireEvent('end', res);
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