define(['jquery', 'cookie'], function ($, cookie) {
    return {
        cart: function () {
            const $price = $(".price")  // 价格
            const $picture = $("picture") // 图片
            const $title = $("title") //标题
            const $cart_content = $(".cart-content")// 盒子
            const $oneall = $(".oneall")// 小计
            const $onecheck = $(".onecheck")// 单选
            const $allcheck = $(".allcheck")// 全选
            // 获取到id数组和数量数组
            // 只有在存在cookie的情况下去获取idarr和numarr
            if (cookie.get("idarr")) {
                let $sidarr = cookie.get("idarr").split(",")
                let $numarr = cookie.get("numarr").split(",")
                // console.log($.cookie("idarr").split(""))

                $.each($sidarr, function (index, value) {

                    $.ajax({
                        type: "GET",
                        url: "http://10.31.152.32/project-wyyx/php/detail.php",
                        data: { sid: value }
                    }).done(function (data) {

                        var data = JSON.parse(data)
                        // console.log(data)
                        let $clone = $(".cart-item").eq(0).clone(true, true)
                        $clone.find(".picture").attr("src", data.url)
                        $clone.find(".picture").attr("sid", data.sid)
                        $clone.find(".title1").html(data.title)
                        $clone.find(".title2").html(data.titletext)
                        $clone.find(".price").html(data.price)
                        $clone.find(".number input").val($numarr[index])
                        $clone.find(".oneall").html(($numarr[index] * data.price).toFixed(2))
                        $cart_content.append($clone)
                        zongjia()
                    });
                });
            }
            //默认全选
            $("[type=checkbox]").attr("checked", true);

            //计算总价
            function zongjia() {
                let $sum = 0; //商品的件数
                let $count = 0; //商品的总价
                // console.log($('.cart-item:visible'))
                $('.cart-item:visible').each(function (index, ele) {

                    if ($(ele).find('.onecheck').prop('checked')) { //复选框勾选
                        // console.log(1)
                        $sum += parseInt($(ele).find('.number input').val());//所有的被选中item数量相加
                        $count += parseFloat($(ele).find('.oneall').html());//所有的被选中item单个总价相加
                    }
                });
                $('.jianshu').html(`已选${$sum}件`);
                $('.zongjia').html(`¥ ${$count.toFixed(2)}`);
            }

            // 全选
            $allcheck.on("change", function () {

                $allcheck.prop('checked', $(this).prop("checked"))
                $('.cart-item:visible').find('.onecheck').prop('checked', $(this).prop('checked'));
                zongjia()
            })

            let $inputs = $('.cart-item:visible').find(':checkbox');
            console.log($inputs)
            // 单选控制全选 单选框无法获取 用事件委托 
            $('.cart-item').on('change', $inputs, function () {
                console.log(1)
                //$(this):被委托的元素，checkbox
                if ($('.cart-item:visible').find('.onecheck').length === $('.cart-item:visible').find('.onecheck:checked').size()) {
                    $allcheck.prop('checked', true);
                } else {
                    $allcheck.prop('checked', false);
                }
                zongjia(); //计算总价
            });

            //计算单价
            function calcsingleprice(obj) { //obj元素对象
                let $dj = parseFloat(obj.parents('.cart-item').find('.price').html());
                let $num = parseInt(obj.parents('.cart-item').find('.number input').val());
                return ($dj * $num).toFixed(2)
            }
            // 增加
            console.log($(".jianhao"))
            $('.jiahao').on('click', function () {
                console.log(1)
                let $num = $(this).parents('.cart-item').find('.number input').val();
                $num++;
                $(this).parents('.cart-item').find('.number input').val($num);

                $(this).parents('.cart-item').find('.oneall').html(calcsingleprice($(this)));
                zongjia(); //计算总价
                setcookie($(this));
            });
            // 减少
            $('.jianhao').on('click', function () {
                let $num = $(this).parents('.cart-item').find('.number input').val();
                $num--;
                if ($num < 1) {
                    $num = 1
                }
                console.log($num)
                $(this).parents('.cart-item').find('.number input').val($num);

                $(this).parents('.cart-item').find('.oneall').html(calcsingleprice($(this)));
                zongjia(); //计算总价
                setcookie($(this));
            });
            // 选中删除
            $('.piliang').on("click", function () {
                // 将cookie取出转成数组
                if (cookie.get('numarr') && cookie.get('idarr')) {
                    var $idarr = cookie.get("idarr").split(",")
                    var $numarr = cookie.get("numarr").split(",")
                } else {
                    $idarr = [];
                    $numarr = [];
                }
                let checkitem = $('.cart-item:visible').has("input:checked")

                checkitem.each(function (index, value) {
                    let sid = $(value).find(".picture").attr("sid")
                    var index = $.inArray(sid, $idarr)
                    //  改变cookie
                    $idarr.splice(index, 1)
                    $numarr.splice(index, 1)
                    //  存入cookie
                    cookie.get('idarr', $idarr, { expires: 7, path: '/' });
                    cookie.get('numarr', $numarr, { expires: 7, path: '/' });

                })
                checkitem.remove()

                zongjia()
            })



        }

    }

});


// define(['jquery', 'cookie'], function ($, cookie) {

//     return {
//         cart: function () {
//             const $carts = $(".cart-content");

//             if (cookie.get("idarr")) {
//                 let $sidarr = cookie.get("idarr").split(',');
//                 let $arrnum = cookie.get("numarr").split(',');
//                 console.log($sidarr);
//                 console.log($arrnum);
//             };

//             function rendercart(sid,num){
//                 $.ajax({
//                     url:"http://10.31.152.32/project-wyyx/php/detail.php",
//                     data:{
//                         sid:idarr
//                     }
//                 }).done((data)=>{
//                     console.log(sid);
//                     console.log(data);
//                 })
//             }
//             rendercart();
//             // $.ajax({
//             //     url: "http://10.31.152.32/project-wyyx/php/detail.php",
//             //     data:{
//             //         sid:sid
//             //     }

//             // }).done((data) => {
//             //     console.log(data);
//             //     let arrdata = JSON.parse(data);

//             //     console.log(arrdata);
//             //     // $.each($sidarr, (sid, value) => {
//             //     //     console.log(sid);
//             //     //     console.log(value);
//             //     //     // console.log($sidarr);
//             //     //     if (value.sid == sid) {
//             //     //         let strhtml = '';

//             //     //         strhtml += `

//             //     //                 `;
//             //     //         $carts.html(strhtml);
//             //     //     }
//             //     // })
//             // })
//         }

//     }



// })
