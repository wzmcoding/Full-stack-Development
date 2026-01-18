module.exports = {
    name: '淘宝',
    desc: 'taobao电商系统',
    homePage: '/todo?proj_key=taobao&key=product',
    menu: [{
        key: 'operating',
        name: '运营活动',
        menuType: 'module',
        moduleType: 'sider',
        siderConfig: {
            menu: [{
                key: 'coupon',
                name: '优惠券',
                menuType: 'module',
                moduleType: 'custom',
                customConfig: {
                    path: '/todo'
                }
            }, {
                key: 'limited',
                name: '限购量',
                menuType: 'module',
                moduleType: 'custom',
                customConfig: {
                    path: '/todo'
                }
            }, {
                key: 'festival',
                name: '节日活动',
                menuType: 'module',
                moduleType: 'custom',
                customConfig: {
                    path: '/todo'
                }
            }]
        }
    }]
}