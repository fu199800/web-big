$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    var layer = layui.layer
    // 获取用户信息
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            console.log(res);
            // 调用form.val()为表单赋值
            form.val('formUserInfo', res.data)

        }
    })
    // 为重置按钮绑定点击事件
    $('#btnReset').on('click', function (e) {
        // alert('ok')
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res);
                form.val('formUserInfo', res.data)

            }
        })
        return false
    })
    // 为form表单绑定提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 上面当我们在子页面中把用户信息更新成功了，服务器端用户信息也变成最新的了，这时我们再调用父页面中的getUserInfo，拿到的也是更新之后的新的用户信息（拿到新信息getUserInfo再在里面调用renderAvatar重新渲染用户头像、更新欢迎语）
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                // window代表iframe所代表的窗口，window.parent代表父页面index;父页面里面有getUserInfo这个方法，使用.getUserInfo()调用即可。
                window.parent.getUserInfo()//在子页面中调用父页面的函数
            }
        })
    })
})