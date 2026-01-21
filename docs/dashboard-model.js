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
                            toFixed: 0, // 保留小数点后几位
                            visible: true, // 默认为 true (false 时，表示不在表单中显示)
                        },
                        // 其它 xxxOption
                        // 字段在 search-bar 中的相关配置
                        searchOption: {
                            // ...eleComponentConfig, // 标准 el-component 配置
                            comType: '', // 配置组件类型 input/select...
                            default: '', // 默认值
                        }
                    },
                    // ...
                }
            },
            // table 相关配置
            tableConfig: {
                headerButtons: [{
                    label: '', // 按钮中文名
                    eventKey: '', // 按钮事件名
                    eventOption: {}, // 按钮事件具体配置
                    // elButtonConfig 标准 el-button 配置
                }],
                rowButtons: [{
                    label: '', // 按钮中文名
                    eventKey: '', // 按钮事件名
                    eventOption: {
                        // 当 eventKey === 'remove'
                        params: {
                            // paramKey = 参数键
                            // rowValueKey = 参数值(格式为 schema::tableKey ，到 table 中找相应的字段, 比如 user_id: schema::user_id)
                            paramKey: rowValueKey
                        }
                    }, // 按钮事件具体配置
                    // elButtonConfig 标准 el-button 配置
                }],
            },
            // search-bar 相关配置
            searchConfig: {},
            // 模块组件
            components: {},
        },
    }]
};