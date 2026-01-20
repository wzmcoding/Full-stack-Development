module.exports = (app) => {
    const BaseController = require('./base')(app);
    return class BusinessController extends BaseController {

        remove(ctx) {
            const { product_id: productId } = ctx.request.body;
            this.success(ctx, {
                product_id: productId
            });
        }

        getList(ctx) {
            const { page, size } = ctx.request.query;
            this.success(ctx, [{
                product_id: '1',
                product_name: '大前端面试宝典',
                price: 39.9,
                inventory: 99999,
                create_time: '2025-01-01 00:00:00'
            }, {
                product_id: '2',
                product_name: '《前端求职之道》',
                price: 199,
                inventory: 100000,
                create_time: '2026-01-02 02:30:00'
            }, {
                product_id: '3',
                product_name: '《大前端全栈实践》',
                price: 699,
                inventory: 18888,
                create_time: '2027-01-03 03:30:00'
            }], {
                total: 3,
                page,
                size
            })
        }
    }
}