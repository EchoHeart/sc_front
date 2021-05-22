module.exports = {
    // 老哥哥，选择开发框架真的要选最流行、最稳定、参考博客最多的啊，
    // 这个最新版的改动快折磨死我了
    publicPath: './',
    // vue 3.x 版跨域
    devServer: {
        // 记得要将跨域放在proxy下面
        // ValidationError: webpack Dev Server Invalid Options
        proxy: {
            "/apis": {
                target: "http://utf8.api.smschinese.cn/",
                // / 如果设置为true,那么本地会虚拟一个服务器接收你的请求并代你发送该请求，这样就不会有跨域问题（只适合开发环境）
                changeOrigin: true,
                pathRewrite: {
                    '^/apis':''
                }
            }
        }
    }
};
