define(['jquery', 'cookie'], function ($, cookie) {
    return {
        cart: function () {

            // 价格
            const $price = $(".price")
            // 图片
            const $picture = $("picture")
            //标题
            const $title = $("title")
            // 盒子
            const $cart_content = $(".cart-content")
            // 小计
            const $oneall = $(".oneall")
            // 单选
            const $onecheck = $(".onecheck")
            // 全选
            const $allcheck = $(".allcheck")
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
                        // zongjia()
                    })
                })
            }



        }

    }










})

    // return {
    //     cart: function () {
    //         const $carts = $(".cart-content");

    //         if (cookie.get("idarr")) {
    //             let $sidarr = cookie.get("idarr").split(',');
    //             let $arrnum = cookie.get("numarr").split(',');
    //             // console.log($sidarr);
    //             // console.log($arrnum);

    //             $.ajax({
    //                 url: "http://10.31.152.32/project-wyyx/php/alldata.php",

    //             }).done((data) => {
    //                 let arrdata = JSON.parse(data);
    //                 // console.log(arrdata);
    //                 $.each($sidarr, (sid, value) => {
    //                     console.log(sid);
    //                     console.log(value);
    //                     // console.log($sidarr);
    //                     if (value.sid == sid) {
    //                         let strhtml = '';

    //                         strhtml += `
    //                             <div class="cart-item">
    //                                 <input type="checkbox" class="onecheck">
    //                                 <img class="picture" src="${value.url}" alt="">
    //                                 <!-- 标题 -->
    //                                 <!-- <p class="title">【丁磊直播款】多功能人体工学转椅</p> -->
    //                                 <div class="title-box">
    //                                     <div class="title1">【丁磊直播款】多功能人体工学转椅</div>
    //                                     <div>撑腰护颈，舒适就坐一整天</div>
    //                                 </div>
    //                                 <!-- <div class="title-box">111111111</div> -->
    //                                 <!-- 价格部分 -->
    //                                 <div class="jiage">
    //                                     <p class="price">￥1199</p>
    //                                     <p>限时购</p>
    //                                 </div>
    //                                 <!-- 数量 -->
    //                                 <div class="number">
    //                                     <div>
    //                                         <div class="jianhao">
    //                                             <i></i>
    //                                         </div>
    //                                         <input type="text" value="1">
    //                                         <div class="jiahao">
    //                                             <i></i>
    //                                             <i></i>
    //                                         </div>
    //                                     </div>

    //                                 </div>
    //                                 <!-- 小计 -->
    //                                 <div class="oneall">
    //                                     ￥1199
    //                                 </div>
    //                                 <!-- 操作 -->
    //                                 <div class="play">
    //                                     <p>移入收藏夹</p>
    //                                     <p class="delete">删除</p>
    //                                 </div>
    //                         </div>      
    //                             `;
    //                         $carts.html(strhtml);
    //                     }
    //                 })
    //             })
    //         };
    //         // renderlist(){
    //         //     console.log(111);
    //         // }

    //     }



