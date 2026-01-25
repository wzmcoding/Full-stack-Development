module.exports = (app) => {
    const BaseController = require('./base')(app);
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    return class BusinessController extends BaseController {
        async create(ctx) {
            const { product_name: productName, price, inventory } = ctx.request.body;
            await sleep(500);
            this.success(ctx, {
                product_id: Date.now(),
                product_name: productName,
                price,
                inventory
            });
        }

        async remove(ctx) {
            const { product_id: productId } = ctx.request.body;
            await sleep(500);
            this.success(ctx, {
                projKey: ctx.projKey,
                product_id: productId
            });
        }

        async getList(ctx) {
            const { product_name: productName, page, size } = ctx.request.query;
            await sleep(500);
            let productList = [{
                product_id: '1',
                product_name: `${ctx.projKey} -《大前端面试宝典》`,
                price: 39.9,
                inventory: 99999,
                create_time: '2025-01-01 00:00:00'
            }, {
                product_id: '2',
                product_name: `${ctx.projKey} -《前端求职之道》`,
                price: 199,
                inventory: 100000,
                create_time: '2026-01-02 02:30:00'
            }, {
                product_id: '3',
                product_name: `${ctx.projKey} -《大前端全栈实践》`,
                price: 699,
                inventory: 18888,
                create_time: '2027-01-03 03:30:00'
            }]

            if (productName && productName !== 'all') {
                productList = productList.filter(item => item.product_name === productName);
            }
            this.success(ctx, productList, {
                total: 3,
                page,
                size
            })
        }

        getProductEnumList(ctx) {
            this.success(ctx, [{
                label: '全部',
                value: 'all'
            }, {
                label: `${ctx.projKey} -《大前端面试宝典》`,
                value: `${ctx.projKey} -《大前端面试宝典》`,
            }, {
                label: `${ctx.projKey} -《前端求职之道》`,
                value: `${ctx.projKey} -《前端求职之道》`,
            }, {
                label: `${ctx.projKey} -《大前端全栈实践》`,
                value: `${ctx.projKey} -《大前端全栈实践》`,
            }]);
        }
    }
}