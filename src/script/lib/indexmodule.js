define(['jquery'], function ($) {
    return {
        render: function () {
            console.log(1111);
        },
        slide: function () {
            // console.log(22222222);
            const btnLeft = $(".btnLeft")
            const btnRright = $(".btnRright")
            const smallbtnlist = $(".samllbtn li")
            const imgs = $(".bannerImg li")
            const btn = $(".btn")
            let index = 0
            let timmer = null
            smallbtnlist.on("click", function () {
                index = $(this).index()
                process()

            })
            // 轮播过程封装
            function process() {
                smallbtnlist.eq(index).addClass("active").siblings().removeClass("active")
                imgs.eq(index).stop().animate({ "opacity": 1 }).siblings().stop().animate({ "opacity": 0 })
            }
            // 左边点击
            btnLeft.on("click", function () {
                index--
                if (index < 0) {
                    index = imgs.length - 1
                }
                process()
            })
            // 右边点击
            btnRright.on("click", function () {
                index++
                if (index > imgs.length - 1) {
                    index = 0
                }
                process()
            })
            // 自动轮播
            timmer = setInterval(function () {
                btnRright.click()
            }, 5000)
            // 鼠标移入图片清除定时器
            imgs.hover(function () {
                clearInterval(timmer)
            }, function () {
                // 自动轮播
                timmer = setInterval(function () {
                    btnRright.click()
                }, 5000)
            })
            // 按钮移入也要清除定时器
            btn.hover(function () {
                clearInterval(timmer)
            }, function () {
                // 自动轮播
                timmer = setInterval(function () {
                    btnRright.click()
                }, 5000)
            })
        }
    }

});