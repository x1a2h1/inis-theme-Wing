module.exports = {
    apps : {
        name   : "inis",
        script : "./server/index.mjs",
        env: {
            PORT:6324,
            NUXT_API_BASE: '',//api接口地址
            NUXT_API_SECRET:'',//api密钥
            NODE_ENV: "production"
        }
    }
}
