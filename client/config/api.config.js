const isProdMode = Object.is(process.env.NODE_ENV, 'production');

module.exports = {
    baseUrl: isProdMode?'http://vnshop.tcongcong.site/api':'api/'
}