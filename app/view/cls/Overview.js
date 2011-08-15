/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Next JS Documentation
 *
 * Copyright (c)2011 Xenophy.CO.,LTD All rights Reserved.
 * http://www.xenophy.com
 */

// {{{ Docs.view.cls.Overview

Ext.define('Docs.view.cls.Overview', {

    // {{{ exntend

    extend: 'Ext.panel.Panel',

    // }}}
    // {{{ alias

    alias: 'widget.classoverview',

    // }}}
    // {{{ requires

    requires: [
        'Docs.view.cls.Toolbar',
        'Docs.Syntax',
        'Docs.Settings'
    ],

    // }}}
    // {{{ cls

    cls: 'class-overview iScroll',

    // }}}
    // {{{ title

    title: 'クラス概要',

    // }}}
    // {{{ autoScroll

    autoScroll: true,

    // }}}
    // {{{ bodyPadding

    bodyPadding: '20',

    // }}}
    // {{{ scrollToEl

    scrollToEl: function(query) {

        var el = Ext.get(Ext.query(query)[0]);
        if (el) {
            var isMember = el.hasCls("member");
            var scrollOffset = el.getY() - (isMember ? 145 : 135);
            var docContent = this.getEl().down('.x-panel-body');
            var currentScroll = docContent.getScroll()['top'];
            docContent.scrollTo('top', currentScroll + scrollOffset, true);

            if (isMember && el.down(".expandable")) {
                el.addCls('open');
            }
            el.highlight();
        }
    },

    // }}}
    // {{{ load

    load: function(docClass) {

        this.docClass = docClass;

        if (this.toolbar) {
            this.removeDocked(this.toolbar, true);
        }
        this.toolbar = Ext.create('Docs.view.cls.Toolbar', {
            docClass: this.docClass
        });
        this.addDocked(this.toolbar);

        this.update(this.renderClass(docClass));
        Docs.Syntax.highlight(this.getEl());

        if (Docs.Settings.get("hideInherited")) {
            this.toolbar.hideInherited(true);
        }
    },

    // }}}
    // {{{ renderClass

    renderClass: function(cls) {
        this.classTpl = this.classTpl || new Ext.XTemplate(
            '<div>',
                '{hierarchy}',
                '{doc}',
                '<div class="members">',
                    '{members}',
                '</div>',
            '</div>'
        );

        return this.classTpl.apply({
            doc: cls.doc,
            hierarchy: this.renderHierarchy(cls),
            members: this.renderMembers(cls)
        });
    },

    // }}}
    // {{{ renderHierarchy

    renderHierarchy: function(cls) {
        if (cls.superclasses.length === 0 && cls.allMixins.length === 0 && cls.alternateClassNames.length === 0) {
            return "";
        }

        this.hierarchyTpl = this.hierarchyTpl || new Ext.XTemplate(
            '<pre class="hierarchy">',
            '<tpl if="alternateClassNames.length &gt; 0">',
                '<h4>代替クラス名</h4>',
                '<tpl for="alternateClassNames">',
                    '<div class="alternate-class-name">{.}</div>',
                '</tpl>',
            '</tpl>',
            '<tpl if="tree">',
                '<h4>継承構造</h4>',
                '{tree}',
            '</tpl>',
            '<tpl if="mixins.length &gt; 0">',
                '<h4>多重継承</h4>',
                '<tpl for="mixins">',
                    '<div class="mixin">{.}</div>',
                '</tpl>',
            '</tpl>',
            '</pre>'
        );

        return this.hierarchyTpl.apply({
            tree: cls.superclasses.length ? this.renderClassTree(cls.superclasses.concat(cls.name), true) : "",
            mixins: Ext.Array.map(cls.allMixins, this.renderLink, this),
            alternateClassNames: cls.alternateClassNames
        });
    },

    // }}}
    // {{{ renderClassTree

    renderClassTree: function(superclasses, firstChild) {
        if (superclasses.length === 0) {
            return "";
        }

        this.classTreeTpl = this.classTreeTpl || new Ext.XTemplate(
            '<div class="subclass {firstChild}">',
              '{link}',
              '{subtree}',
            '</div>'
        );

        var name = superclasses[0];
        return this.classTreeTpl.apply({
            firstChild: firstChild ? 'first-child' : '',
            link: superclasses.length > 1 ? this.renderLink(name) : '<strong>'+name+'</strong>',
            subtree: this.renderClassTree(superclasses.slice(1))
        });
    },

    // }}}
    // {{{ renderLink

    renderLink: function(className) {
        return Ext.String.format('<a href="#/api/{0}" rel="{0}" class="docClass">{0}</a>', className);
    },

    // }}}
    // {{{ renderMembers

    renderMembers: function(cls) {
        var typeTitles = {
            cfg: "コンフィグオプション",
            property: "プロパティ",
            method: "メソッド",
            event: "イベント"
        };

        // Skip rendering empty sections
        var html = [];
        for (var type in typeTitles) {
            if (cls.members[type].length > 0) {
                html.push(this.renderSection(cls.members[type], type, typeTitles[type]));
            }
        }
        return html.join("");
    },

    // }}}
    // {{{ renderSection

    renderSection: function(members, type, title) {
        this.sectionTpl = this.sectionTpl || new Ext.XTemplate(
            '<div id="m-{type}">',
                '<div class="definedBy">定義クラス</div>',
                '<h3 class="members-title">{title}</h3>',
                '{members}',
            '</div>'
        );

        return this.sectionTpl.apply({
            type: type,
            title: title,
            members: Ext.Array.map(members, this.renderMemberDiv, this).join("")
        });
    },

    // }}}
    // {{{ renderMemberDiv

    renderMemberDiv: function(member, index) {
        this.memberTpl = this.memberTpl || new Ext.XTemplate(
            '<div id="{tagname}-{name}" class="member {firstChild} {inherited}">',
                // leftmost column: expand button
                '<a href="#" class="side {expandable}">',
                    '<span>&nbsp;</span>',
                '</a>',
                // member name and type + link to owner class and source
                '<div class="title">',
                    '<div class="meta">',
                        '<a href="#/api/{owner}" rel="{owner}" class="definedIn docClass">{owner}</a><br/>',
                        '<a href="source/{href}" target="_blank" class="viewSource">ソースコード参照</a>',
                    '</div>',
                    '{signature}',
                '</div>',
                // short and long descriptions
                '<div class="description">',
                    '<div class="short">{[this.shortDoc(values)]}</div>',
                    '<div class="long">{longDoc}</div>',
                '</div>',
            '</div>',
            {
                // Returns contents for short documentation
                shortDoc: function(cfg) {
                    return cfg.shortDoc ? cfg.shortDoc : cfg.doc;
                }
            }
        );

        return this.memberTpl.apply(Ext.apply({
            // use classname "first-child" when it's first member in its category
            firstChild: (index === 0) ? "first-child" : "",
            // use classname "expandable" when member has shortened description
            expandable: member.shortDoc ? "expandable" : "not-expandable",
            // use classname "inherited" when member is not defined in this class
            inherited: member.owner === this.docClass.name ? "not-inherited" : "inherited",
            // method params signature or property type signature
            signature: this.renderSignature(member),
            // full documentation together with optional parameters and return value
            longDoc: this.renderLongDoc(member)
        }, member));
    },

    // }}}
    // {{{ renderSignature

    renderSignature: function(member) {
        this.signatureTpl = this.signatureTpl || new Ext.XTemplate(
            '{before}<a href="#/api/{member}-{tagname}-{name}" class="name {expandable}">{name}</a>{params}{after}'
        );

        var cfg = Ext.apply({}, member);
        cfg.expandable = member.shortDoc ? "expandable" : "not-expandable";

        if (member.tagname === "method" && member.name === member.owner.replace(/^.*\./, "")) {
            cfg.before = "<strong class='constructor-signature'>new</strong>";
        }

        if (member.tagname === "cfg" || member.tagname === "property") {
            cfg.params = "<span> : " + member.type + "</span>";
        }
        else {
            var ps = Ext.Array.map(member.params, this.renderShortParam, this).join(", ");
            cfg.params = '( <span class="pre">' + ps + "</span> )";
            if (member.tagname === "method") {
                cfg.params += " : " + member["return"].type;
            }
        }

        if (member.protected) {
            cfg.after = "<strong class='protected-signature'>protected</strong>";
        }
        if (member.static) {
            cfg.after = "<strong class='static-signature'>静的</strong>";
        }
        if (member.deprecated) {
            cfg.after = "<strong class='deprecated-signature'>廃止予定</strong>";
        }

        return this.signatureTpl.apply(cfg);
    },

    // }}}
    // {{{ renderShortParam

    renderShortParam: function(param) {
        var p = param.type + " " + param.name;
        return param.optional ? "["+p+"]" : p;
    },

    // }}}
    // {{{ renderLongDoc

    renderLongDoc: function(member) {
        var doc = member.doc;

        if (member.deprecated) {
            //var v = member.deprecated.version ? "since " + member.deprecated.version : "";
            var v = member.deprecated.version ? 'バージョン ' +  member.deprecated.version + 'から' : "";
            doc += '<div class="deprecated">';
            //doc += Ext.String.format('<p>This {0} has been <strong>deprecated</strong> {1}</p>', member.tagname, v);
            //
            var mt = member.tagname;
            if(mt === 'method') {
                mt = 'メソッド';
            }

            doc += Ext.String.format('<p>この{0}は、{1}<strong>廃止予定</strong>です。</p>', mt, v);
            doc += member.deprecated.text;
            doc += '</div>';
        }

        if (member.params && member.params.length > 0) {
            doc += '<h3 class="pa">パラメーター</h3>';
            var ps = Ext.Array.map(member.params, this.renderLongParam, this).join("");
            doc += "<ul>" + ps + "</ul>";
        }

        if (member["return"]) {
            doc += this.renderReturn(member["return"]);
        }

        return doc;
    },

    // }}}
    // {{{ renderLongParam

    renderLongParam: function(param) {
        this.paramTpl = this.paramTpl || new Ext.XTemplate(
            '<li>',
                '<span class="pre">{name}</span> : {type}',
                '<div class="sub-desc">',
                    '{doc}',
                '</div>',
            '</li>'
        );

        return this.paramTpl.apply(param);
    },

    // }}}
    // {{{ renderReturn

    renderReturn: function(returnDoc) {
        this.returnTpl = this.returnTpl || new Ext.XTemplate(
            '<h3 class="pa">戻り値</h3>',
            '<ul>',
                '<li>',
                    '<span class="pre">{type}</span>',
                    '<div class="sub-desc">',
                        '{doc}',
                    '</div>',
                '</li>',
            '</ul>'
        );

        return this.returnTpl.apply(returnDoc);
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
