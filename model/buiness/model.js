module.exports = {
    model: "dashbuiness",
    name: '电商系统',
    menu: [{
        key: 'product',
        name: '商品管理',
        menuType: 'module',
        moduleType: 'schema',
        schemaConfig: {
            api: '/api/proj/product',
            schema: {
                type: 'object',
                properties: {
                    product_id: {
                        type: 'string',
                        label: '商品id',
                        tableOption: {
                            width: 300,
                            'show-overflow-tooltip': true,
                        },
                        editFormOption: {
                            comType: 'input',
                            disabled: true,
                        }
                    },
                    product_name: {
                        type: 'string',
                        label: '商品名称',
                        maxLength: 10,
                        minLength: 3,
                        tableOption: {
                            width: 200,
                        },
                        searchOption: {
                            comType: 'dynamicSelect',
                            api: '/api/proj/product_enum/list',
                        },
                        createFormOption: {
                            comType: 'input',
                            default: '草莓蛋糕',
                        },
                        editFormOption: {
                            comType: 'input',
                        }
                    },
                    price: {
                        type: 'number',
                        label: '价格',
                        maximum: 1000,
                        minimum: 30,
                        tableOption: {
                            width: 200,
                        },
                        searchOption: {
                            comType: 'select',
                            enumList: [
                                {
                                    label: '全部',
                                    value: -99
                                },
                                {
                                    label: '￥39.9',
                                    value: 39.9
                                },
                                {
                                    label: '￥199',
                                    value: 199
                                },
                                {
                                    label: '￥699',
                                    value: 699
                                }
                            ]
                        },
                        createFormOption: {
                            comType: 'inputNumber',
                        },
                        editFormOption: {
                            comType: 'inputNumber',
                        }
                    },
                    inventory: {
                        type: 'number',
                        label: '库存',
                        tableOption: {
                            width: 200,
                        },
                        searchOption: {
                            comType: 'input',
                        },
                        createFormOption: {
                            comType: 'select',
                            enumList: [
                                {
                                    label: '100',
                                    value: 100
                                },
                                {
                                    label: '1000',
                                    value: 1000
                                },
                                {
                                    label: '10000',
                                    value: 10000
                                }
                            ]
                        },
                        editFormOption: {
                            comType: 'inputNumber',
                        }
                    },
                    create_time: {
                        type: 'string',
                        label: '创建时间',
                        tableOption: {},
                        searchOption: {
                            comType: 'dateRange',

                        }
                    },
                },
                required: ['product_name']
            },
            tableConfig: {
                headerButtons: [{
                    label: '添加商品',
                    eventKey: 'showComponent',
                    eventOption: {
                        comName: 'createForm'
                    },
                    type: 'primary',
                    plain: true,
                }],
                rowButtons: [{
                    label: '修改',
                    eventKey: 'showComponent',
                    eventOption: {
                        comName: 'editForm',
                    },
                    type: 'warning'
                }, {
                    label: '删除',
                    eventKey: 'remove',
                    eventOption: {
                        params: {
                            product_id: 'schema::product_id'
                        }
                    },
                    type: 'danger',
                }],
            },
            componentConfig: {
                createForm : {
                    title: '新增商品',
                    saveBtnText: '新增商品'
                },
                editForm: {
                    mainKey: 'product_id',
                    title: '修改商品',
                    saveBtnText: '修改商品'
                }
            }
        }
    }, {
        key: 'order',
        name: '订单管理',
        menuType: 'module',
        moduleType: 'custom',
        customConfig: {
            path: '/todo'
        }
    }, {
        key: 'client',
        name: '客户管理',
        menuType: 'module',
        moduleType: 'custom',
        customConfig: {
            path: '/todo'
        }
    }]

}