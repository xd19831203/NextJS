/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS Documentation
 *
 * Copyright (c)2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ Docs.view.cls.Toolbar

Ext.define('Docs.view.cls.Toolbar', {

    // {{{ extend

    extend: 'Ext.toolbar.Toolbar',

    // }}}
    // {{{ requires

    requires: [
        'Docs.view.HoverMenuButton',
        'Docs.Settings'
    ],

    // }}}
    // {{{ dock

    dock: 'top',

    // }}}
    // {{{ cls

    cls: 'member-links',

    // }}}
    // {{{ padding

    padding: '3 5',

    // }}}
    // {{{ docClass

    docClass: {},

    // }}}
    // {{{ initComponent

    initComponent: function() {
        this.items = [];
        this.memberButtons = {};

        var memberTitles = {
            cfg: "コンフィグオプション",
            property: "プロパティ",
            method: "メソッド",
            event: "イベント"
        };
        for (var type in memberTitles) {
            var members = this.docClass.members[type];
            if (members.length) {
                var btn = this.createMemberButton({
                    text: memberTitles[type],
                    type: type,
                    members: members
                });
                this.memberButtons[type] = btn;
                this.items.push(btn);
            }
        }

        if (this.docClass.subclasses.length) {
            this.items.push(this.createClassListButton("サブクラス", this.docClass.subclasses));
        }
        if (this.docClass.mixedInto.length) {
            this.items.push(this.createClassListButton("多重継承", this.docClass.mixedInto));
        }

        this.items = this.items.concat([
            { xtype: 'tbfill' },
            {
                boxLabel: '継承メンバを非表示',
                boxLabelAlign: 'before',
                xtype: 'checkbox',
                margin: '0 5 0 0',
                padding: '0 0 5 0',
                checked: Docs.Settings.get("hideInherited"),
                handler: function(el) {
                    this.hideInherited(el.checked);
                },
                scope: this
            },
            {
                xtype: 'button',
                iconCls: 'expandAllMembers',
                tooltip: "すべて展開",
                handler: function() {
                    Ext.Array.forEach(Ext.query('.side.expandable'), function(el) {
                        Ext.get(el).parent().addCls('open');
                    });
                }
            },
            {
                xtype: 'button',
                iconCls: 'collapseAllMembers',
                tooltip: "すべて閉じる",
                handler: function() {
                    Ext.Array.forEach(Ext.query('.side.expandable'), function(el) {
                        Ext.get(el).parent().removeCls('open');
                    });
                }
            }
        ]);

        this.callParent(arguments);
    },

    // }}}
    // {{{ createMemberButton

    createMemberButton: function(cfg) {
        var data = Ext.Array.map(cfg.members, function(m) {
            return this.createLinkRecord(this.docClass.name, m);
        }, this);

        return Ext.create('Docs.view.HoverMenuButton', {
            text: cfg.text,
            cls: 'icon-'+cfg.type,
            store: this.createStore(data),
            showCount: true,
            listeners: {
                click: function() {
                    this.up('classoverview').scrollToEl("#m-" + cfg.type);
                },
                scope: this
            }
        });
    },

    // }}}
    // {{{ createClassListButton

    createClassListButton: function(text, classes) {
        var data = Ext.Array.map(classes, function(cls) {
            return this.createLinkRecord(cls);
        }, this);

        return Ext.create('Docs.view.HoverMenuButton', {
            text: text,
            cls: 'icon-subclass',
            showCount: true,
            store: this.createStore(data)
        });
    },

    // }}}
    // {{{ createStore

    createStore: function(records) {
        var store = Ext.create('Ext.data.Store', {
            fields: ['id', 'cls', 'url', 'label', 'inherited']
        });
        store.add(records);
        return store;
    },

    // }}}
    // {{{ createLinkRecord

    createLinkRecord: function(cls, member) {
        return {
            cls: cls,
            url: member ? cls+"-"+member.tagname+"-"+member.name : cls,
            label: member ? member.name : cls,
            inherited: member ? member.owner !== cls : false
        };
    },

    // }}}
    // {{{ hideInherited

    hideInherited: function(hide) {
        Docs.Settings.set("hideInherited", hide);

        // show/hide all inherited members
        Ext.Array.forEach(Ext.query('.member.inherited'), function(m) {
            Ext.get(m).setStyle({display: hide ? 'none' : 'block'});
        });

        // Remove all first-child classes
        Ext.Array.forEach(Ext.query('.member.first-child'), function(m) {
            Ext.get(m).removeCls('first-child');
        });

        Ext.Array.forEach(['cfg', 'property', 'method', 'event'], function(type) {
            var sectionId = '#m-' + type;

            // Hide the section completely if all items in it are inherited
            if (Ext.query(sectionId+' .member.not-inherited').length === 0) {
                var section = Ext.query(sectionId)[0];
                section && Ext.get(section).setStyle({display: hide ? 'none' : 'block'});
            }

            // add first-child class to first member in section
            var sectionMembers = Ext.query(sectionId+' .member' + (hide ? ".not-inherited" : ""));
            if (sectionMembers.length > 0) {
                Ext.get(sectionMembers[0]).addCls('first-child');
            }

            if (this.memberButtons[type]) {
                var store = this.memberButtons[type].getStore();
                if (hide) {
                    store.filterBy(function(m) { return !m.get("inherited"); });
                }
                else {
                    store.clearFilter();
                }
            }
        }, this);
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
