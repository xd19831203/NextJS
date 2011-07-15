
Ext.onReady(function() {

    console.log(window.node_jscoverage_result);

    var results = [];
    Ext.iterate(node_jscoverage_result.files, function(file, o) {

        results.push({
            name: file,
            LOC: o.LOC,
            SLOC: o.SLOC,
            coverage: o.coverage,
            totalMisses: o.totalMisses
        });

    });

    Ext.create('Ext.data.Store', {
        storeId:'coverage',
        fields:['name', 'LOC', 'SLOC', 'coverage', 'totalMisses'],
        data:{'results': results,},
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'results'
            }
        }
    });

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items:[{
            region: 'center',
            title: 'Next JS Unit Test Code Coverage Result.',
            xtype:'grid',
            store: Ext.data.StoreManager.lookup('coverage'),
            columns: [
                {header: 'FileName',  dataIndex: 'name', flex: 1},
                {header: 'LOC', dataIndex: 'LOC'},
                {header: 'SLOC', dataIndex: 'SLOC'},
                {header: 'coverage', dataIndex: 'coverage', renderer: function(v) {

                    if(v == '100.00') {
                        return '<span style="color:green;">' + v + '%</span>';
                    } else {
                        return '<span style="color:red;">' + v + '%</span>';
                    }
                    return v;
                }},
                {header: 'totalMisses', dataIndex: 'totalMisses'}
            ]
        }]
    });

});
