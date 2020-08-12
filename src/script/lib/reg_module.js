define(['jquery'], function ($) {

    return {
        reg: function () {

            // 账号
            const $username = $(".username")
            // 用户名
            const $password = $(".password")
            // 账号提示
            const $username_tip = $(".username-tip")
            // 密码提示
            const $password_tip = $(".password-tip")
            console.log($username)
            //每一个表单一个标记。
            let userflag = false; //标记
            let passflag = false;

            $username.on("focus", function () {

                $username_tip.html('设置后不可更改，中英文均可，最长14个英文或7个汉字')
                    .css({
                        color: '#ccc'
                    })
            })

            $username.on('blur', function () {
                if ($(this).val() !== '') { //有值
                    let len = $(this).val().replace(/[\u4e00-\u9fa5]/g, 'aa').length; //将中文转换成两个英文计算长度
                    if (len < 14) {
                        $.ajax({
                            type: 'post',
                            url: 'http://10.31.152.32/project-wyyx/php/registry.php',
                            data: {
                                username: $username.val()
                            }
                        }).done(function (result) {
                            console.log(result)
                            if (!result) { //不存在
                                $username_tip.html('√').css('color', 'green');
                                userflag = true;
                            } else {
                                $username_tip.html('用户名已经存在').css('color', '#ea3d3d');
                                userflag = false;
                            }
                        })
                    } else {
                        $username_tip.html('用户名长度有问题').css({
                            color: '#ea3d3d'
                        });
                        userflag = false;
                    }
                } else {
                    $username_tip.html('用户名不能为空').css({
                        color: '#ea3d3d'
                    });
                    userflag = false;
                }
            });

            $password.on("focus", function () {
                $password_tip.html('请输入8-16位密码').css({ color: "#ccc" })
            })

            $password.on("blur", function () {
                if ($password !== "") {
                    // 有值
                    let $password_val = $(this).val();
                    if ($password_val.length >= 8 && $password_val.length <= 14) {
                        let regnum = /\d+/;
                        let regupper = /[A-Z]+/;
                        let reglower = /[a-z]+/;
                        let regother = /[\W\_]+/; //其他字符

                        //                 //test():匹配存在感
                        let $count = 0; //计数

                        if (regnum.test($password_val)) {
                            $count++;
                        }
                        console.log($count)
                        if (regupper.test($password_val)) {
                            $count++;
                        }

                        if (reglower.test($password_val)) {
                            $count++;
                        }

                        if (regother.test($password_val)) {
                            $count++;
                        }

                        switch ($count) {
                            case 1:
                                $password_tip.html('弱').css({
                                    color: 'red'
                                });
                                passflag = false;
                                break;


                            case 2:
                                $password_tip.html('中').css({
                                    color: 'yellow'
                                });
                                passflag = true;
                                break;
                            case 3:
                                $password_tip.html('强').css({
                                    color: 'green'
                                });
                                passflag = true;
                                break;
                        }

                    } else {
                        $password_tip.html('密码长度错误').css({
                            color: 'red'
                        });
                        passflag = false;
                    }
                } else {
                    $password_tip.html('密码不能为空').css({ color: "#ccc" })
                }
            })

            // console.log(passflag,userflag)
            // 注册按钮
            $(".reg-btn").on("click", function () {
                // alert(111111111)
                let onecheck = $("input:checkbox").prop("checked")
                if (passflag && userflag && onecheck) {
                    // console.log($username)
                    // console.log($username.val(),$password.val())
                    $.ajax({
                        type: 'post',
                        url: 'http://10.31.152.32/project-wyyx/php/registry.php',
                        data: {
                            submit: "1",
                            username: $username.val(),
                            password: $password.val(),
                        }
                    }).done(function () {
                        console.log(1111111);
                        location.href = "../../home.html"
                    })
                }
            })




        }

    }
})