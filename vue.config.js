const Path = require('path');

function resolve(path) {
    return Path.resolve(__dirname,path)
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '../www' : 'dev-www',
    outputDir: process.env.NODE_ENV === 'production' ? resolve('../www') : resolve('dev-www'),
    assetsDir: 'build',
    css: {
        loaderOptions: {
            sass: {
                data: `@import "./src/assets/style/global.scss";`
            }
        }
    },
    devServer: {
        port: 9000,
        open: true,  
        proxy: {
            '/dev': {
                target: '',
                changeOrigin: true,
                pathRewrite: { '^/dev': '' },
            }
        }
    }
}