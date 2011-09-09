Ext.data.JsonP.tutorial_template({
    "guide": [

        '<h1>テンプレートエンジン</h1>',
        '<p>',
        'Next JSのHTMLは、すべてテンプレートエンジンを介して出力されるため、HTMLがテンプレートであると言えます。',
        'ここでは、テンプレートエンジンの機能を学びます。',
        '</p>',

        '<h2>デリミタ</h2>',
        '<p>',
        'デリミタとは、テンプレートの処理を記述する際に用いる、開始と終了の特別な文字列を指します。',
        '初期状態では、次のように設定されています。',
        '</p>',

        '<h4>開始デリミタ</h4>',
        '<pre>',
        '<span style="color:#990000;">&lt;!--{</span>',
        '</pre>',

        '<h4>終了デリミタ</h4>',
        '<pre>',
        '<span style="color:#990000;">}--&gt;</span>',
        '</pre>',

        '<h2>テンプレートへのデータ設定</h2>',
        '<p>',
        'ユーザーがリクエストして、アクションが実行された後にテンプレート処理が実行され、最終的にHTMLが出力されます。',
        'テンプレートへ出力するデータは、アクションで設定します。',
        'アクション内で、<em>this.set(\'key\', \'value\')</em>で設定します。',
        'this.setで値を設定するときに使用したkeyをそのままデリミタで囲い埋め込むことができます。',
        '</p>',

        '<h4>アクション</h4>',
        '<pre>',
        '<span style="color:#000099;">this</span>.<span style="color:#000099;">set</span>(<span style="color:#009900;">\'key\'</span>, <span style="color:#009900;">\'value\'</span>);',
        '</pre>',

        '<h4>テンプレート</h4>',
        '<pre>',
        '<span style="color:#990000;">&lt;!--{key}--&gt;</span>',
        '</pre>',

        '<h4>出力結果</h4>',
        '<pre>',
        '<span style="color:#990000;">value</span>',
        '</pre>',

        '<h2>リテラル</h2>',
        '<p>',
        'デリミタを含むような部分に対して、リテラルとして囲うことでテンプレート処理を無視させることができます。',
        '</p>',

        '<p style="color:red;">',
        'Version 0.8.1でデリミタを含み囲うと、出力されない部分が存在するバグがあります。次バージョンで対応予定です。',
        '</p>',

        '<h2>繰り返し処理</h2>',

        '<p>',
        '繰り返しには、<em>foreach</em>を利用します。',
        '</p>',

        '<h4>アクション</h4>',
        '<pre>',
        '<span style="color:#000099;">this</span>.<span style="color:#000099;">set</span>(<span style="color:#009900;">\'data\'</span>, {' + "\n",
        '    fruit: [{' + "\n",
        '        name: <span style="color:#009900;">\'melon\'</span>,' + "\n",
        '        price: <span style="color:#009900;">2500</span>' + "\n",
        '    },{' + "\n",
        '        name: <span style="color:#009900;">\'orange\'</span>,' + "\n",
        '        price: <span style="color:#009900;">100</span>' + "\n",
        '    }]' + "\n",
        '});',
        '</pre>',

        '<h4>テンプレート</h4>',
        '<pre>',
        '<span style="color:#0000FF;">&lt;dl&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{foreach from=data.fruit item=item key=key}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dt&gt;</span><span style="color:#990000;">&lt;!--{item.name}--&gt;</span><span style="color:#0000FF;">&lt;/dt&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>Price: <span style="color:#990000;">&lt;!--{item.price}--&gt;</span><span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{/foreach}--&gt;</span>' + "\n",
        '<span style="color:#0000FF;">&lt;/dl&gt;</span>',
        '</pre>',

        '<h4>出力結果</h4>',
        '<pre>',
        '<span style="color:#0000FF;">&lt;dl&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dt&gt;</span>melon<span style="color:#0000FF;">&lt;/dt&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>Price: 2500<span style="color:#0000FF;">&lt;/dd&gt;</span>    ' + "\n",
        '    <span style="color:#0000FF;">&lt;dt&gt;</span>orange<span style="color:#0000FF;">&lt;/dt&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>Price: 100<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '<span style="color:#0000FF;">&lt;/dl&gt;</span>',
        '</pre>',

        '<p>',
        'data.fruit内に格納された配列を繰り返しています。',
        'foreachには、繰り返したいオブジェクトをfromで設定します。',
        '繰り返し時に、イテレートされるオブジェクトを参照する変数名をitemに、キーをkeyに設定します。',
        '</p>',

        '<h3>繰り返しデータが無い場合の処理</h3>',
        '<p>',
        '条件により、繰り返すデータが存在場合があります。',
        'その場合に出力するエリアを、<em>foreachelse</em>で設定することができます。',
        '</p>',

        '<h4>テンプレート</h4>',
        '<pre>',
        '<span style="color:#0000FF;">&lt;dl&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{foreach from=data.nodata item=item key=key}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dt&gt;</span><span style="color:#990000;">&lt;!--{item.name}--&gt;</span><span style="color:#0000FF;">&lt;/dt&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>Price: <span style="color:#990000;">&lt;!--{item.price}--&gt;</span><span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{foreachelse}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>No items.<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{/foreach}--&gt;</span>' + "\n",
        '<span style="color:#0000FF;">&lt;/dl&gt;</span>',
        '</pre>',

        '<h4>出力結果</h4>',
        '<pre>',
        '<span style="color:#0000FF;">&lt;dl&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>No items.<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '<span style="color:#0000FF;">&lt;/dl&gt;</span>',
        '</pre>',


        '<h2>条件分岐</h2>',

        '<p>',
        '条件分岐には、<em>if</em>を利用します。',
        '</p>',

        '<h4>アクション</h4>',
        '<pre>',
        '<span style="color:#000099;">this</span>.<span style="color:#000099;">set</span>(<span style="color:#009900;">\'data\'</span>, {' + "\n",
        '    string: <span style="color:#009900;">\'string\'</span>,' + "\n",
        '    number: <span style="color:#009900;">3000</span>,' + "\n",
        '    bool: <span style="color:#000099;">true</span>' + "\n",
        '});',
        '</pre>',

        '<h4>テンプレート</h4>',
        '<pre>',
        '<span style="color:#0000FF;">&lt;dl&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{if data.string === \'string\'}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.string is &quot;string&quot;.<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{/if}--&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{if data.number == \'3000\'}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is 3000.<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{/if}--&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{if data.number != \'2000\'}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is not 2000.<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{/if}--&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{if data.number &gt; 1000}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is over 1000.<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{/if}--&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{if data.number &gt;= 3000}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is below 3000.<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{/if}--&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{if data.number &lt;= 3000}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is more 3000.<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{/if}--&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{if data.number &lt; 5000}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is under 5000.<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{/if}--&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{if data.string === \'string\' and data.bool === true}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.string is &quot;string&quot; and data.bool is true.<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{/if}--&gt;</span>' + "\n",
        '<span style="color:#0000FF;">&lt;/dl&gt;</span>',
        '</pre>',

        '<h3>複数条件、条件外</h3>',

        '<p>',
        '複数条件を指定するためには、<em>elseif</em>を、条件外に関しては<em>else</em>利用します。',
        '</p>',

        '<h4>テンプレート</h4>',
        '<pre>',
        '<span style="color:#0000FF;">&lt;dl&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{if data.number == 3001}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is 3001<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{elseif data.number == 3000}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is 3000<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{/if}--&gt;</span>' + "\n",
        '' + "\n",
        '    <span style="color:#990000;">&lt;!--{if data.number == 3001}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is 3001<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{elseif data.number == 3002}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is 3000<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{else}--&gt;</span>' + "\n",
        '        <span style="color:#990000;">&lt;!--{if data.number == 3001}--&gt;</span>' + "\n",
        '        <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is 3001<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '        <span style="color:#990000;">&lt;!--{elseif data.number == 3000}--&gt;</span>' + "\n",
        '        <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is 3000<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '        <span style="color:#990000;">&lt;!--{/if}--&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{/if}--&gt;</span>' + "\n",
        '<span style="color:#0000FF;">&lt;/dl&gt;</span>',
        '</pre>',

        '<h4>出力結果</h4>',
        '<pre>',
        '<span style="color:#0000FF;">&lt;dl&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is 3000<span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>data.number is 3000<span style="color:#0000FF;">&lt;/dd&gt;</span>           ' + "\n",
        '<span style="color:#0000FF;">&lt;/dl&gt;</span>',
        '</pre>',


        '<h2>外部テンプレートの読み込み</h2>',

        '<p>',
        'テンプレート内から、別なテンプレートを読み込むには、<em>include</em>を利用します。',
        '</p>',

        '<h4>テンプレート</h4>',
        '<pre>',
        '<span style="color:#990000;">&lt;!--{include file=\'foo.html\' outvar=\'Next JS\'}--&gt;</span>' + "\n",
        '</pre>',

        '<h4>templates/foo.html</h4>',
        '<pre>',
        '<span style="color:#0000FF;">&lt;p&gt;</span>This area is <span style="color:#0000FF;">&lt;em&gt;</span>&quot;templates/foo.html&quot;<span style="color:#0000FF;">&lt;em&gt;</span>.' + "\n",
        '<span style="color:#0000FF;">&lt;p&gt;</span>outvar : <span style="color:#990000;">&lt;!--{outvar}--&gt;</span><span style="color:#0000FF;">&lt;/p&gt;</span>',
        '</pre>',

        '<p>',
        'includeでファイルを読み込むときに、<em>file</em>に対して、読み込むファイルを設定します。',
        'インクルードするファイルは、publicと同位の<em>templates</em>ディレクトリから読み込みます。',
        '</p>',


        '<h2>装飾子</h2>',

        '<p>',
        '変数の値を直接出力するだけではなく、何かしらのフィルターをかけて出力することができます。',
        '<em>修飾子</em>と呼びますが、<em>|(パイプ)</em>の後ろに利用する修飾子を指定します。',
        'NX.util.Formatクラスメソッドを直接利用できます。',
        '</p>',

        '<p style="color:red;">',
        '(メモ)ユーザー作成のメソッドも呼び出せますが、動作確認中です。',
        '</p>',

        '<h4>テンプレート</h4>',
        '<pre>',
        '<span style="color:#0000FF;">&lt;dl&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{foreach from=data.fruit item=item key=key}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dt&gt;</span><span style="color:#990000;">&lt;!--{item.name}--&gt;</span><span style="color:#0000FF;">&lt;/dt&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>Price: <span style="color:#990000;">&lt;!--{item.price|jpMoney}--&gt;</span><span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#990000;">&lt;!--{/foreach}--&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>number: <span style="color:#990000;">&lt;!--{data.number|numberFormat}--&gt;</span><span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>string: <span style="color:#990000;">&lt;!--{data.string|capitalize}--&gt;</span><span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>text: <span style="color:#990000;">&lt;!--{data.text|nl2br}--&gt;</span><span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>html: <span style="color:#990000;">&lt;!--{data.html|htmlEncode}--&gt;</span><span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '    <span style="color:#0000FF;">&lt;dd&gt;</span>replace: <span style="color:#990000;">&lt;!--{data.string|replace:&quot;str&quot;:&quot;enjoy&quot;}--&gt;</span><span style="color:#0000FF;">&lt;/dd&gt;</span>' + "\n",
        '<span style="color:#0000FF;">&lt;/dl&gt;</span>',
        '</pre>',

        '<address>Copyright &copy; 2006 - 2011 <a href="http://www.xenophy.com/">Xenophy.CO.,LTD</a> All rights Reserved.</address>',

        ].join("")
    });
