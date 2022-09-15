$(function () {
    // 注册页面
    $('#link-reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    // 登录页面
    $('#link-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    // 密码验证
    // 从layui中获取form
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 验证两次密码是否一致
        // 通过形参拿到确认密码框中的内容
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }

    })
    // 为注册表单绑定提交事件
    $('#form_reg').on('submit', function (e) {
        // return false
        e.preventDefault()
        // var formData = $(this).serialize()
        //  console.log(formData);


        // $.post('http://www.liulongbin.top:3007/api/reguser', { data: formData }, function (res){
        //     if (res.status !== 0) {
        //         return console.log(res.message);
        //     }
        //     console.log('用户注册成功');
        // })


        var formData = $(this).serialize()
        // console.log(formData);
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: formData,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('用户注册成功')
                //    模拟点击事件
                $('#link-login').click()
            }
        })
    })
    // 监听登录表单提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                // console.log(res.token);
                // 登录成功后将token存储到localstorage中
                localStorage.setItem('token',res.token)
                location.href='./index.html'
            }
        })
    })
})