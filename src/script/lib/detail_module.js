define(['jquery', 'cookie'], function ($, cookie) {
    return {
        detail: function () {
            let $sid = location.search.substring(1).split('=')[1];
            const $smallpic = $(".smallimg");
            const $bpic = $("#bpic");
            const $price = $(".pricenow");
            const $title = $(".title");
            const $titletext = $(".titletext");

            const $oul = $(".ulist");
            $.ajax({
                url: "http://10.31.152.32/project-wyyx/php/detail.php",
                type: "GET",
                data: {
                    sid: $sid
                }
            }).done(function (data) {
                let dataobj = JSON.parse(data);
                // console.log(dataobj);
                $smallpic.attr("src", dataobj.url);
                $title.html(dataobj.title);
                $titletext.html(dataobj.t$titletext);
                $price.html("¥" + dataobj.price);
                $bpic.attr("src", dataobj.url)

                let imglist = dataobj.piclisturl.split(",");
                let str = "";
                $.each(imglist, (index, value) => {
                    str += `
                     <li><img src="${value}" alt=""></li>
                `;
                })

                $oul.html(str);
            })

            // 放大镜效果
            const $spic = $('.details-left-top');
            const $sf = $('#sf'); //小放
            const $bf = $('#bf'); //大放
            const $left = $('#left'); //左箭头
            const $right = $('#right'); //右箭头
            // const $bpic = $("#bpic");
            const $list = $('#list'); //小图列表
            // const $oul = $(".ulist")

            //  鼠标移入图片的时候放大镜可见
            let $bili = $bpic.width() / $spic.width(); //比例 大图/小图
            // 根据比例设置大放大镜的宽高
            $bf.css({
                height: $sf.height() * $bili,
                width: $sf.width() * $bili
            })

            $spic.hover(function () {
                $sf.css('visibility', 'visible');
                $bf.css('visibility', 'visible');
                $(this).on('mousemove', function (ev) {
                    var ev = ev || window.event;
                    let $leftvalue = ev.pageX - $(this).offset().left - $sf.width() / 2;
                    let $topvalue = ev.pageY - $(this).offset().top - $sf.height() / 2;
                    if ($leftvalue < 0) {
                        $leftvalue = 0;
                    } else if ($leftvalue >= $spic.width() - $sf.width()) {
                        $leftvalue = $spic.width() - $sf.width()
                    }

                    if ($topvalue < 0) {
                        $topvalue = 0;
                    } else if ($topvalue >= $spic.height() - $sf.height()) {
                        $topvalue = $spic.height() - $sf.height()
                    }

                    $sf.css({
                        left: $leftvalue,
                        top: $topvalue
                    });

                    $bpic.css({
                        left: -$leftvalue * $bili,
                        top: -$topvalue * $bili
                    });
                    // console.log(-$leftvalue * $bili,)

                });
            }, function () {
                $sf.css('visibility', 'hidden');
                $bf.css('visibility', 'hidden');
            });

            //小图切换
            $oul.on('click', 'li', function () {
                //$(this):当前操作的li
                let $imgurl = $(this).find('img').attr('src');
                // 直接替换src路径
                $smallpic.attr('src', $imgurl);
                $bpic.attr('src', $imgurl);
            });

            //左右箭头事件
            let $num = 5; //列表显示的图片个数
            $right.on('click', function () {
                let $lists = $('.ulist li');
                if ($lists.size() > $num) { //限制点击的条件
                    $num++;
                    $left.css('color', '#333');
                    if ($lists.size() == $num) {
                        $right.css('color', '#fff');
                    }
                    $oul.animate({
                        left: -($num - 5) * $lists.eq(0).outerWidth(true)
                    });
                }
            });


            $left.on('click', function () {
                let $lists = $('.ulist li');
                if ($num > 5) { //限制点击的条件
                    $num--;
                    $right.css('color', '#333');
                    if ($num <= 5) {
                        $left.css('color', '#fff');
                    }
                    $oul.animate({
                        left: -($num - 5) * $lists.eq(0).outerWidth(true)
                    });
                }
            });

        },
        addgoods: function () {
            // cookie.set('name','zhangsan',100); //检测一下cookie,能用
            // console.log(cookie.get('name'));

            const $addgoods = $('.jiaru');
            let $sid = location.search.substring(1).split('=')[1];
            let idarr = [];  //存放商品的sid和num
            let numarr = [];
            let _this = $(this);

            // function cookietoarray() {
            //     if (cookie.get('cookiesid') && cookie.get('cookienum')) {
            //         _this.idarr = cookie.get('cookiesid').split(',');
            //         _this.numarr = cookie.get('cookienum').split(',');
            //     } else {
            //         _this.arrsid = [];
            //         _this.arrnum = [];
            //     }
            // }
            console.log(111);

            $addgoods.on('click', function () {
                // console.log(_this);
                // cookietoarray();
                let $num = $(".number input").val();
                
                // console.log(22222);
                if (cookie.get("idarr")) {
                    // console.log($.cookie("idarr").split())
                    // 存在就取出赋值
                    idarr = cookie.get("idarr").split(",")
                    numarr = cookie.get("numarr").split(",")
                    console.log(11);
                    console.log(idarr);
                    // 判断是否是第一次赋值 获取id
                    if (idarr.indexOf($sid) == -1) {
                        // 存数量和id
                        idarr.push($sid)
                        numarr.push($num)

                        console.log(idarr, numarr)
                        cookie.set("idarr", idarr, 10)
                        cookie.set("numarr", numarr, 10)
                    } else {
                        // 不是第一次赋值 就直接改变num值
                        let index = idarr.indexOf($sid)
                        numarr[index] = Number(numarr[index]) + Number($num)
                        cookie.set("numarr", numarr, 10)
                    }
                } else {
                    let idarr = []
                    let numarr = []

                    idarr.push($sid)
                    numarr.push($num)
                    cookie.set("idarr", idarr, 10)
                    cookie.set("numarr", numarr, 10)
                }
                // alert("加入购物车成功")
            })
        }


    }
});























// const $jiaru = $('.jiaru')
// // $.cookie("idarr",idarr,{expires:7,path:'/'})
// let idarr = []
// let numarr = []
// $jiaru.on("click", function () {
//     // 获取一下num值
//     let $num = $(".number input").val()
//     if ($.cookie("idarr")) {
//         // console.log($.cookie("idarr").split())
//         // 存在就取出赋值
//         idarr = $.cookie("idarr").split(",")
//         numarr = $.cookie("numarr").split(",")

//         // 判断是否是第一次赋值 获取id
//         if (idarr.indexOf($sid) == -1) {
//             // 存数量和id
//             idarr.push($sid)
//             numarr.push($num)

//             console.log(idarr, numarr)
//             $.cookie("idarr", idarr, { expires: 7, path: '/' })
//             $.cookie("numarr", numarr, { expires: 7, path: '/' })
//         } else {

//             // 不是第一次赋值 就直接改变num值
//             let index = idarr.indexOf($sid)
//             numarr[index] = Number(numarr[index]) + Number($num)
//             $.cookie("numarr", numarr, { expires: 7, path: '/' })
//         }
//     } else {
//         let idarr = []
//         let numarr = []

//         idarr.push($sid)
//         numarr.push($num)
//         $.cookie("idarr", idarr, { expires: 7, path: '/' })
//         $.cookie("numarr", numarr, { expires: 7, path: '/' })
//     }
//     alert("加入购物车成功")
// })