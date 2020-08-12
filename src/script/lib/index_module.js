define(['jquery'], function ($) {
    return {
        //渲染
        render: function () {
            // console.log(1111);
            const $hotcontent = $('.hotcontent')
            // const $hotcontent_btn = $('.hottitle li')
            const $hotcontent_btn = $('.hottitle li')

            $hotcontent_btn.on("click", function () {
                let index = $(this).index()
                console.log(index);
                $hotcontent.eq(index).css("display", "block")
                    .siblings(".hotcontent").css("display", "none")
            })
            
            $.ajax({
                url: "http://10.31.152.32/project-wyyx/php/alldata.php",
                type: "GET"
            }).done(function (data) {

                console.log(data); //数据
                let arrdata = JSON.parse(data);
                console.log(arrdata);
                let strhtml1 = ''; //人气推荐
                const $content1 = $(".hotcontent-item1 ul");
                let strhtml2 = '';//限时购
                const $content2 = $(".timebuy-right");
                let strhtml3 = '';  //福利社
                const $content3 = $(".welfare-content-list");
                let strhtml4 = ''; //居家生活
                const $content4 = $(".product-Content1");
                let strhtml5 = '';   //美食生活
                const $content5 = $(".product-Content2")

                $.each(arrdata, (index, value) => {
                    // console.log(index);
                    // console.log(value);

                    //人气推荐渲染6条
                    if (index < 6) {
                        //第二种方法，clone一个隐藏的li来渲染
                        /* let $clone = $(".hotcontent-item1 li").first().clone(true, true)
                        // $clone.find("img").attr('data-original', value.url)
                        $clone.find("img").attr('data-original', value.url)

                        $clone.find(".hotcontent-price").html(value.price)
                        $clone.find(".befor-price").html(value.befprice)
                        $clone.find(".hotcontent-title").html(value.title)
                        $box.append($clone)

                        // 懒加载效果
                        $(function () { //和拼接的元素放在一起。
                            $(".lazy").lazyload({
                                effect: "fadeIn" //图片显示方式
                            });
                        }); */

                        strhtml1 += `
                        
                            <li>
                                <!-- 上面图片内容 -->
                                <div class="product-Content-Top">
                                <!-- 懒加载和src -->
                                    <img class="lazy" src="${value.url}" alt="">
                                </div>
                                <!-- 下面标题价格内容 -->
                                <div class="product-Content-Botton">
                                    <div><span>新人特价</span><span>满减优惠</span></div>
                                    <!-- 标题 -->
                                    <h4>
                                        <a href="" title="${value.title}">
                                            <span class="hotcontent-title">${value.title}</span>
                                        </a>
                                    </h4>
                                    <!-- 价格 -->
                                    <p>
                                        <span class="hotcontent-price">¥${value.price}</span>
                                        <span><del class="befor-price">¥${value.befprice}</del></span>
                                    </p>
                                </div>
                        </li>
                            
                        `;
                    }
                    //限时购4条数据
                    if (index >= 6 && index < 10) {
                        strhtml2 += `
                        <section class="timebuy-item">
                        <div class="timebuy-item-left">
                            <img src="${value.url}"
                                alt="">
                        </div>
                        <div class="timebuy-item-right">
                            <h2>${value.title}</h2>
                            <p>${value.titletext}</p>
                            <!-- 剩余件数 -->
                            <div class="timebuy-item-num">
                                <!-- 进度条 -->
                                <div>
                                    <div></div>
                                </div>
                                <span class="timebuy-shenyu">${value.sailnumber}件</span>
                            </div>
                            <!-- 价格 -->
                            <div class="timebuy-item-price">
                                限时价
                                <span>¥</span>
                                <span class="nowprice">${value.price}</span>
                                <span class="guoquprice"><del>¥159</del></span>
                            </div>
                            <!-- 立即抢购按钮 -->
                            <div class="timebuy-btn">
                                立即抢购
                            </div>
                        </div>

                    </section>
                        
                     `;
                    }
                    //福利社
                    if (index >= 10 && index < 14) {
                        strhtml3 += `
                        <div class="welfare-content-product">
                            <!-- 左边商品图片 -->
                            <div class="welfare-content-product-left">
                                <img src="${value.url}"
                                    alt="">
                            </div>
                            <div class="welfare-content-product-right">
                                <p class="welfare-content-product-title">
                                    ${value.title}
                                </p>
                                <p>
                                    限时价 <span>¥</span><span class="welfare-content-product-price">${value.price}</span>
                                </p>
                                <p class="welfare-guoquprice">
                                <del>¥${value.befprice}</del>
                                </p>
                                <p>立即抢购</p>
                            </div>
                        </div>



                        `;

                    }
                    //居家生活
                    if (index >= 14 && index < 18) {
                        strhtml4 += `
                        <section class="con1">
                            <!-- 上面图片内容 -->
                            <div class="product-Content-Top1">
                                <img src="${value.url}"
                                    alt="">
                            </div>
                            <!-- 下面标题价格内容 -->
                            <div class="product-Content-Botton1">
                                <div><span>每满200减25劵</span></div>
                                <!-- 标题 -->
                                <h4>
                                    <a href="" title="${value.title}">
                                        <span>${value.title}</span>
                                    </a>
                                </h4>
                                <!-- 价格 -->
                                <p>
                                    <span>¥${value.price}</span>
                                    <span><del>￥${value.befprice}</del></span>
                                </p>
                            </div>
                        </section>
                        
                        `;
                    }
                    //美食生活
                    if (index >= 18 && index < 22) {
                        strhtml5 += `
                        <section class="con2">
                        <!-- 上面图片内容 -->
                        <div class="product-Content-Top2">
                            <img src="${value.url}"
                                alt="">
                          
                        </div>
                        <!-- 下面标题价格内容 -->
                        <div class="product-Content-Botton2">
                            <div><span>每满200减25劵</span></div>
                            <!-- 标题 -->
                            <h4>
                                <a href="" title="${value.title}">
                                    <span>${value.title}</span>
                                </a>
                            </h4>
                            <!-- 价格 -->
                            <p>
                                <span>¥${value.price}</span>
                                <span><del>￥${value.befprice}</del></span>
                            </p>
                        </div>
                    </section>
                        `;
                    }
                });

                $content1.html(strhtml1);
                $content2.html(strhtml2);
                $content3.html(strhtml3);
                $content4.html(strhtml4);
                $content5.html(strhtml5);

                //加了后有个报错，不知道为什么。
                //添加懒加载
                // $(function () {
                //     $("img.lazy").lazyload({ effect: "fadeIn" });
                // });

            });
        },
        // 轮播
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
                c
                index = $(this).index()
                carousel()

            })
            // 轮播过程
            function carousel() {
                smallbtnlist.eq(index).addClass("active").siblings().removeClass("active")
                imgs.eq(index).stop().animate({ "opacity": 1 }).siblings().stop().animate({ "opacity": 0 })
            }
            // 左边点击
            btnLeft.on("click", function () {
                index--
                if (index < 0) {
                    index = imgs.length - 1
                }
                carousel()
            })
            // 右边点击
            btnRright.on("click", function () {
                index++
                if (index > imgs.length - 1) {
                    index = 0
                }
                carousel()
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
        },
        
    }

});