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

            // 全选控制单选
            // $allcheck.on("change", function () {
            //     // 全选框状态同步
            //     console.log($(this).prop("checked")) //全选就是true
            //     $allcheck.prop('checked', $(this).prop("checked"))
            //     // 单选框和全选框状态同步
            //     // console.log($onecheck)
            //     // $onecheck.prop('checked',$(this).prop("checked"))
            //     // 找到所有的单选框变成被选中
            //     // 直接获取获取不到 通过找到可见所有的car-item和find去找到
            //     $('.cart-item:visible').find('.onecheck').prop('checked', $(this).prop('checked'));
            //     zongjia()
            // });






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
