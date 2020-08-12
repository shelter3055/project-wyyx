/* 这里放公共的效果模块 */



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
        },
        /* 左侧和右侧菜单栏 */
        rightNav: function () {
            /* 右边的 */
            const rightNav = $("#rightNav")
            console.log(this);
            let top = rightNav.offset().top - 70
            $(document).on("scroll", function () {
                if ($(this).scrollTop() >= top) {
                    rightNav.css("position", "fixed")
                    rightNav.css("top", 60)
                    rightNav.css("right", 0)
                } else if ($(this).scrollTop() < top) {
                    rightNav.css("position", "absolute")
                    rightNav.css("top", 35)
                    rightNav.css("right", 5)
                }
            })
            // 回到顶部
            $('.backtop').on('click', function () {
                $('html').animate({
                    scrollTop: 0
                })
            })


        },
        leftNav: function () {
            const leftNav = $("#leftNav")
            console.log(5555555);
            let top = leftNav.offset().top
            $(document).on("scroll", function () {
                if ($(this).scrollTop() >= top) {
                    leftNav.css("position", "fixed")
                    // leftNav.css("top",60) //1
                    // leftNav.css("left",0)//1
                    leftNav.css("top", 60)
                    leftNav.css("left", 70)
                } else {
                    leftNav.css("position", "absolute")
                    leftNav.css("top", 55)
                    leftNav.css("left", 70) 


                    // leftNav.css("position","fixed")
                    // leftNav.css("top",100)
                    // leftNav.css("left",85)

                }
            })
        },
        /* 导航条固定 */
        fixedtop: function () {
            const header_nav_box = $("#header-Nav-box")
            let top = header_nav_box.offset().top
            let flag = true
            $(document).on("scroll", function () {
                if ($(this).scrollTop() >= top && flag) {
                    flag = false
                    header_nav_box.css("position", "fixed")
                    header_nav_box.css("top", -40).stop().animate({ "top": 0 })
                } else if ($(this).scrollTop() < top) {
                    flag = true
                    header_nav_box.css("position", "relative")
                }
            })
        },
        //首页顶部点击登陆框弹出登录
        login: function () {
            const $denglu = $(".denglu")
            const $login_box = $(".login-box")
            const $guanbi = $(".guanbi")
            const $login = $(".login")
            const $login_btn = $(".longin-btn")
            $denglu.on("click", function () {
                $login_box.show()
                $login.animate({ "width": "300", "opacity": "1" }, 300)

            })
            $guanbi.on("click", function () {
                $login_box.hide()
                $login.animate({ "opacity": "0" }, 300)
            })
        },
        //注册
        reg: function () {

            console.log(1111);
            const $username = $(".username")// 用户名
            const $password = $(".password") // 账号提示
            const $username_tip = $(".username-tip")// 密码提示
            const $password_tip = $(".password-tip")
            let userflag = false; //标记
            let passflag = false;
            $username.on("focus", function () {

                $username_tip.html('设置后不可更改，中英文均可，最长14个英文或7个汉字')
                    .css({
                        color: '#ccc'
                    })
            })
        }

    }
})