module.exports = {
    apps : [{
        name   : "inis",
        script : "./server/index.mjs",
        env: {
            PORT:6324,
            NUXT_API_BASE: 'https://wing.crunl.cn/api',//api接口地址
            NUXT_API_SECRET:'J0RIWGTUUWBU9KB1TZPQ9VO7DR9D8I8L',//api密钥
            NODE_ENV: "production"
        },
        env_development:{
            NUXT_PUBLIC_API_BASE: 'https://wing.crunl.cn/api',//api接口地址
            NUXT_PUBLIC_API_SECRET:'J0RIWGTUUWBU9KB1TZPQ9VO7DR9D8I8L',//api密钥
            NODE_ENV: "development"
        }
    }]
}
