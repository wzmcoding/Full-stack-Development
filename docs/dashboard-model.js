const config = {
    mode: 'dashboard', // 模版类型， 不同模版类型对应不一样的模版数据结构
    name: '', // 名称
    desc: '', // 描述
    icon: '', // icon
    homePage: '', // 首页(项目配置)
    // 头部菜单
    menu: [{
        key: '',// 菜单唯一描述
        name: '', // 菜单名称
        menuType: '', // 枚举值 group / module
        // menuType = group 时 可填
        subMenu: [{
            // 可递归 menuItem
        }],

        // 当 menuType == module 时， 可填
        moduleType: '', // 枚举值 ： sider/iframe/custom/schema

        // 当 moduleType = sider 时
        siderConfig: {
            menu: [{
                // 可递归 除 moduleType = sider 外
            }]
        },

        // 当 moduleType = iframe 时
        iframeConfig: {
            path: '', // iframe 路径
        },

        // 当 moduleType = custom 时
        customConfig: {
            path: '', // 自定义路由路径
        },

        // 当 moduleType = schema 时
        schemaConfig: {
            api: '', // 数据源 api （遵循 RESTFUL 规范）
            schema: {
                type: 'object',
                properties: {
                    key: {
                        // ...schema, // 标准 schema 配置 - 注意：这里需要实际的schema对象
                        label: '', // 字段的中文名
                        type: '', // 字段类型
                        // 字段在 table 中的相关配置
                        tableOption: {
                            // ...elTableColumnConfig 标准 el-table-column 配置
                            visible: true, // 是否在表单中可见
                        },
                        // 其它 xxxOption
                    },
                    // ...
                }
            },
            // table 相关配置
            tableConfig: {
                headerButtons: [],
                rowButtons: [],
            },
            // searchBar 相关配置
            searchConfig: {},
            // 模块组件
            components: {},
        },
    }]
};