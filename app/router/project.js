module.exports = (app, router) => {
    const { project: ProjectController } = app.controller;
    router.get('/api/project/list', ProjectController.getList.bind(ProjectController))
    // router.post('/api/project/list', ProjectController.getList.bind(ProjectController))
}