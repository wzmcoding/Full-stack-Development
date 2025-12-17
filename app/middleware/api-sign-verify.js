/**
 * API 签名合法性校验
 */
module.exports = (app) => {
    return async (ctx, next) => {
        // 只对 API 请求做签名校验
        if(ctx.path.indexOf('/api') < 0) {
            return await next()
        }

        const { path, method } = ctx;
        const { headers } = ctx.request;
        const { s_sign: sSign, s_t: st } = headers;

        const signKey = ''

        await next();
    }
}