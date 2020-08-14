















  <div class="cart-item">
  <input type="checkbox" class="onecheck">
  <img class="picture" src="${value.url}" alt="">
  <!-- 标题 -->
  <!-- <p class="title">【丁磊直播款】多功能人体工学转椅</p> -->
  <div class="title-box">
      <div class="title1">【丁磊直播款】多功能人体工学转椅</div>
      <div>撑腰护颈，舒适就坐一整天</div>
  </div>
  <!-- <div class="title-box">111111111</div> -->
  <!-- 价格部分 -->
  <div class="jiage">
      <p class="price">￥1199</p>
      <p>限时购</p>
  </div>
  <!-- 数量 -->
  <div class="number">
      <div>
          <div class="jianhao">
              <i></i>
          </div>
          <input type="text" value="1">
          <div class="jiahao">
              <i></i>
              <i></i>
          </div>
      </div>

  </div>
  <!-- 小计 -->
  <div class="oneall">
      ￥1199
  </div>
  <!-- 操作 -->
  <div class="play">
      <p>移入收藏夹</p>
      <p class="delete">删除</p>
  </div>
</div>













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
            $allcheck.on("change", function () {
                //console.log($(this).prop("checked")) //全选就是true
                $allcheck.prop('checked', $(this).prop("checked"))
                // 单选框和全选框状态同步
                // console.log($onecheck)
                // $onecheck.prop('checked',$(this).prop("checked"))
                // 找到所有的单选框变成被选中
                // 直接获取获取不到 通过找到可见所有的car-item和find去找到
                $('.cart-item:visible').find('.onecheck').prop('checked', $(this).prop('checked'));
                zongjia()

                let $inputs = $('.cart-item:visible').find('.onecheck');
                $('.cart-content').on('change', $inputs, function () {
                    if ($('.cart-item:visible').find('.onecheck').length === $('.cart-item:visible').find('input:checked').size()) {

                        $allcheck.prop('checked', true);
                    } else {
                        $allcheck.prop('checked', false)
                    }
                    zongjia()
                })
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

            //   cookie更新数量
            function setcookie(obj) {
                if (cookie('numarr') && cookie('idarr')) {
                    var $idarr = cookie("idarr").split(",")
                    var $numarr = cookie("numarr").split(",")
                } else {
                    $idarr = [];
                    $numarr = [];
                }
                let $sid = obj.parents('.cart-item').find('img').attr('sid');
                $numarr[$.inArray($sid, $idarr)] = obj.parents('.cart-item').find('.number input').val();
                cookie('numarr', $numarr, { expires: 7, path: '/' });
            }

            //增加
            $('.jiahao').on('click', function () {
                
                let $num = $(this).parents('.cart-item').find('.number input').val();
                $num++;
                $(this).parents('.cart-item').find('.number input').val($num);

                $(this).parents('.cart-item').find('.oneall').html(calcsingleprice($(this)));
                zongjia(); //计算总价
                setcookie($(this));
            });
