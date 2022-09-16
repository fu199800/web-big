$.ajaxPrefilter(function (options) {
    // 拼接请求路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // console.log(options.url);
    // 统一为有权限的接口设置 headers 请求头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''

        };
    }
    // 登录拦截
    // 无论请求成功还是失败，最终都会调用 complete 函数
    options.complete=function (res) {
        // res.responseJSON 保存着服务器返回的数据
        // console.log(1);
        console.log(res)
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1、清除本地存储的 token
            localStorage.removeItem("token")
            // 2、强制跳转到登录页面
            location.href = "./login.html"
        }
    }
})
