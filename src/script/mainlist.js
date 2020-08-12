require.config({
    paths: { //配置名称和路径。
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery',
        'jquerycookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie',
        'jquerylazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload',
        'pagination':'../publicjs/jquery.pagination'
    }
});

require(['./lib/list_module','./lib/effect_module'], function (n1,n2) {
    n1.render();
    n2.fixedtop();
    n2.login();
    
})