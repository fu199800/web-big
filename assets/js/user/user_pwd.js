$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        newPwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码与原密码相同，请重新输入'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '新密码不正确.请重新输入'
            }
        }
    })
    $('.layui-form').on('submit', function () {
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status!==0){
                    return layer.msg('密码修改失败')
                }
                layer.msg('密码修改成功')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
        return false
    })
})