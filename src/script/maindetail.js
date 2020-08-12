require.config({
    paths: { //配置名称和路径。
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery',
        'jquerycookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie',
        'jquerylazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload',

    }
});
require(['./lib/detail_module','./lib/effect_module'], function (p1,p2) {
    p1.detail();
    // p1.zoom();
    p2.login();
    p1.addgoods();
})