module.exports = (app, router) => {
    const { business: businessController } = app.controller;

    router.delete('/api/product', businessController.remove.bind(businessController));

    router.get('/api/product/list', businessController.getList.bind(businessController));
}