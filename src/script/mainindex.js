require.config({
    paths: { //配置名称和路径。
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery',
        'jquerycookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie',
        'jquerylazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload'

        // indexmodule: "../script/lib/indexmodule",

    }
});

require(['./lib/index_module', './lib/effect_module'], function (m1, m2) {
    m1.render();
    m1.slide();
    m2.login();
    m2.tab();
    m2.fixedtop();
    m2.rightNav();
    m2.leftNav();


});
