define(['jquery'], function ($) {

    return {
        reg: function () {
            const $form = $('.reg-conent form')
            const $username = $(".username")// 邮箱

            const $password = $(".password") // 密码 
            const $username_tip = $(".username-tip")// 账号提示

            const $password_tip = $(".password-tip")// 密码提示
            // console.log($username)
            //每一个表单一个标记。
            let userflag = true;
            let passflag = true;

            $username.on("focus", function () {

                $username_tip.html('设置后不可更改，中英文均可，最长14个英文或7个汉字')
                    .css({
                        color: '#ccc'
                    })
            });
            $username.on('blur', function () {
                if ($(this).val() !== '') {
                    // let len = $(this).val().replace(/[\u4e00-\u9fa5]/g, 'aa').length;
                    let len = $(this).val().replace(/^[a-zA-Z]\w{5,15}$/).length;
                    if (len < 20) {
                        $.ajax({
                            type: 'post',
                            url: 'http://10.31.152.32/project-wyyx/php/registry.php',
                            data: {
                                username: $username.val()
                            }
                        }).done(function (result) {
                            console.log(result);
                            if (!result) {
                                $username_tip.html('该用户名可用').css('color', 'green');
                                userflag = true;
                            } else {
                                $username_tip.html('该用户名已经存在').css('color', 'red');
                                userflag = false;
                            }
                        })
                    } else {
                        $username_tip.html('该用户名长度有问题').css({
                            color: 'red'
                        });
                        userflag = false;
                    }
                } else {
                    $username_tip.html('该用户名不能为空').css({
                        color: 'red'
                    });
                    userflag = false;
                }

            });

            $password.on('focus', function () {
                $password_tip.html('长度为8~14个字符,至少包含2种字符').css({
                    color: 'black'
                });
            });

            $password.on('input', function () {
                let $pass = $(this).val();
                if ($pass.length >= 8 && $pass.length <= 14) {
                    let regnum = /\d+/;
                    let regupper = /[A-Z]+/;
                    let reglower = /[a-z]+/;
                    let regother = /[\W\_]+/;
                    let $count = 0;

                    if (regnum.test($pass)) {
                        $count++;
                    }

                    if (regupper.test($pass)) {
                        $count++;
                    }

                    if (reglower.test($pass)) {
                        $count++;
                    }

                    if (regother.test($pass)) {
                        $count++;
                    }

                    switch ($count) {
                        case 1:
                            $password_tip.html('密码强度弱').css({
                                color: 'red'
                            });
                            passflag = false;
                            break;

                        case 2:
                        case 3:
                            $password_tip.html('密码强度中').css({
                                color: 'yellow'
                            });
                            passflag = true;
                            break;
                        case 4:
                            $password_tip.html('密码强度强').css({
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
            });

            $password.on('blur', function () {
                if ($(this).val() !== '') {
                    if (passflag) {
                        $password_tip.html('密码有效').css({
                            color: 'green'
                        });
                        passflag = true;
                    }
                } else {
                    $password_tip.html('密码不能为空').css({
                        color: 'red'
                    });
                    passflag = false;
                }
            });
            $form.on('submit', function () {
                if ($username.val() === '') {
                    $username_tip.html('该用户名不能为空').css({
                        color: 'red'
                    });
                    userflag = false;
                }
                if ($password.val() === '') {
                    $password_tip.html('密码不能为空').css({
                        color: 'red'
                    });
                    passflag = false;
                }

                //阻止跳转：DOM 0级事件 return false   DOM 2级  event.perventDefault() / event.returnValue = false
                if (!userflag || !passflag) {
                    return false;
                }
            });
        },






































        
        signin: function () {
            $('.longin-btn').on('click', function () {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.152.32/project-wyyx/php/login.php',
                    data: {
                        user: $('.username').val(),
                        pass: hex_sha1($('.password').val())
                    }
                }).done(function (result) {
                    if (result) {
                        location.href = "home.html";
                    } 
                    
                    else {
                        $('.password').val('');
                        alert('用户名或者密码错误');
                    }
                });
            });


        }

    }
})


/*

done(function(result) {
            if (result) {
                location.href = "index.html";
                localStorage.setItem('username', $('.username').val());
            } else {
                $('.password').val('');
                alert('用户名或者密码错误');
            }*/