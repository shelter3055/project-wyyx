require.config({
    paths: { //配置名称和路径。
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery',
        'jquerycookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie',
        'jquerylazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload'

        // indexmodule: "../script/lib/indexmodule",

    },
    shim: { //让不支持amd的模块支持amd
        'jquerycookie': {
            deps: ['jquery'], //依赖的模块
            // exports: ['jquerycookie'] //暴露的模块名称
        },
        'jquerylazyload': {
            deps: ['jquery']
        }
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
