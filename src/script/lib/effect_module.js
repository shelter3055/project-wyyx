/* 这里放公共的效果模块 */

/* 左侧和右侧菜单栏 */
/* 顶部的导航条固定 */

define(['jquery'], function ($) {
    return {
        /* 商品下拉二级菜单 */
        tab: function () {
            const oli = $(".header-Nav .Navmove")
            const item = $(".menu .item")
            const menu = $(".menu")
            //  console.log(oli)
            oli.hover(function () {
                menu.show()
                let index = $(this).index() - 1
                // console.log($(this).index()) //1 2 3 4 5 6 7 8
                //自动调整item的宽度
                item.eq(index).css("width", item.eq(index).children().length * 148 - 24)
                item.eq(index).show().siblings().hide()

                // 自动调整菜单的left值
                //  console.log(menu.width())
                menu.css("left", (-(menu.width() - 1050) / 2))
            }, function () {
                menu.hide()
            })
            //  自身的移入移出
            menu.hover(function () {
                $(this).show()
            }, function () {
                $(this).hide()
            })
        }

    }
})