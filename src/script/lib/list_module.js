define(['jquery','jquerylazyload','pagination'], function ($) {
    return {
        render: function () {
            const oul = $(".koubei-content");
            let array_default = [];//排序前的li数组
            let array = [];//排序中的数组
            let prev = null;
            let next = null;
            let ospan = $(".paixu span");


            $.ajax({
                url: "http://10.31.152.32/project-wyyx/php/list.php",
                type: "GET"

            }).done(function (data) {
                let Arrdata = JSON.parse(data);
                // console.log(Arrdata);
                let strhtml = "";
                $.each(Arrdata, (sid, value) => {
                    // console.log(sid);
                    strhtml += `
                        <li>
                        <a href="detail.html?sid=${value.sid}">
                        <div class="product-Content-Top">
                            <img class="lazy" data-original="${value.url}" alt="">
                            <div class="promBanner">
                                <div class="promBanner-left">
                                    <div>新人特价</div>
                                    <div>
                                        <span>${value.price}</span>
                                        起
                                    </div>
                                </div>
                                <div class="promBanner-right">
                                    限${value.sailnumber}件 仅剩2天
                                </div>
                            </div>
                        
                        
                        </div>
                    
                        <div class="product-Content-Botton">
                            <div><span>限时购</span></div>
                
                            <h4>
                                <a href="#" title="${value.title}">
                                    <span>${value.title}</span> 
                                </a>
                            </h4>
                    
                            <p>
                                <span class="price">¥${value.price}</span>
                                <span><del>¥${Math.round(Number(value.price) + 10) * 100 / 100}</del></span>
                               
                            </p>
                        </div>
                        </a>
                    </li>
            
                    `
                })
                oul.html(strhtml);

                // 添加懒加载
                $(function () {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
            })

            //分页
            $('.page').pagination({
                pageCount: 3,//总的页数
                jump: true,//是否开启跳转到指定的页数，布尔值。
                coping: true,//是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '尾页',
                callback: function (api) {
                    console.log(api.getCurrent());//获取的页码给后端
                    $.ajax({
                        url: "http://10.31.152.32/project-wyyx/php/list.php",
                        data: {
                            page: api.getCurrent()
                        },
                        dataType: 'json'
                    }).done(function (data) {
                        let $strhtml = '';
                        $.each(data, function (index, value) {
                            $strhtml += `
                            
                            <li>
                        <a href="detail.html?sid=${value.sid}">
                        <div class="product-Content-Top">
                            <img class="lazy" data-original="${value.url}" alt="">
                            <div class="promBanner">
                                <div class="promBanner-left">
                                    <div>新人特价</div>
                                    <div>
                                        <span>${value.price}</span>
                                        起
                                    </div>
                                </div>
                                <div class="promBanner-right">
                                    限${value.sailnumber}件 仅剩2天
                                </div>
                            </div>
                        </div>
                    
                        <div class="product-Content-Botton">
                            <div><span>限时购</span></div>
                
                            <h4>
                                <a href="#" title="${value.title}">
                                    <span>${value.title}</span> 
                                </a>
                            </h4>
                    
                            <p>
                                <span class="price">¥${value.price}</span>
                                <span><del>¥${Math.round(Number(value.price) + 10) * 100 / 100}</del></span>
                               
                            </p>
                        </div>
                        </a>
                    </li>
                            
                                    
                            `;
                        });
                        oul.html($strhtml);

                        //添加懒加载
                        $(function () {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });


                        array_default = [];//排序前的li数组
                        array = [];//排序中的数组
                        prev = null;
                        next = null;

                        //将页面的li元素加载到两个数组中
                        $('.koubei-content li').each(function (index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });
                    })
                }
            });

            //排序
            // 默认排序

            ospan.eq(1).on('click', function () {
                console.log(111111111);
                $.each(array_default, function (index, value) {
                    oul.append(value);
                });
                return;
            });


            //价格排序
            ospan.eq(2).on("click", function () {
                console.log(22222);
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html().substring(1));
                        next = parseFloat(array[j + 1].find('.price').html().substring(1));
                        //通过价格的判断，改变的是li的位置。
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function (index, value) {
                    // console.log(value);//n.fn.init [li, context: li]
                    oul.append(value);
                });

            });
















            // ospan.eq(1).on('click', function () {
            //     $.each(array_default, function (index, value) {
            //         oul.append(value);
            //     });
            //     return;
            // });

            // 价格排序
            // ospan.eq(2).on('click', function () {

            //     for (let i = 0; i < array.length - 1; i++) {
            //         for (let j = 0; j < array.length - i - 1; j++) {
            //             prev = parseFloat(array[j].find('.price').html().substring(1));
            //             next = parseFloat(array[j + 1].find('.price').html().substring(1));
            //             //通过价格的判断，改变的是li的位置。
            //             if (prev > next) {
            //                 let temp = array[j];
            //                 array[j] = array[j + 1];
            //                 array[j + 1] = temp;
            //             }
            //         }
            //     }

            // $.each(array, function (index, value) {
            //     // console.log(value);//n.fn.init [li, context: li]
            //     oul.append(value);
            // });

        }
    }

})