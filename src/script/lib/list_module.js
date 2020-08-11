define(['jquery'], function ($) {
    return {
        render: function () {
            const oul = $(".koubei-content");
            $.ajax({
                url: "http://10.31.152.32/project-wyyx/php/alldata.php",
                type: "GET"

            }).done(function (data) {
                let Arrdata = JSON.parse(data);
                console.log(Arrdata);
                let strhtml = "";
                $.each(Arrdata, (sid, value) => {
                    console.log(sid);
                    strhtml += `
                        <li>
                        <a href="detail.html?sid=${value.sid}">
                        <div class="product-Content-Top">
                            <img class="lazy" src="${value.url}" alt="">
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
                                <span><s>¥${Math.round(Number(value.price) + 10) * 100 / 100}</s></span>
                            </p>
                        </div>
                        </a>
                    </li>
            
                    `
                })
                oul.html(strhtml);
            })
        }
    }

})