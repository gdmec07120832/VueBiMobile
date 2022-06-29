export default [
    {
        title: '权限管理',
        key: '1',
        icon: 'user',
        children: [
            {
                title: '用户管理',
                key: '1-1',
                path: '/auth/user_manage',
                icon: '',
            },
            {
                title: '角色管理',
                key: '1-2',
                path: '/auth/role_manage',
                icon: '',
            },
            {
                title: '权限设置',
                key: '1-3',
                path: '/auth/auth_configuration',
                icon: ''
            }
        ],
    },
    {
        title: 'SQL配置',
        key: '2',
        path: '',
        icon: 'table',
        children: [
            {
                title: '移动灯塔',
                path: '/sql_config/index',
                key: '2-0'
            },
            {
                title: '数据灯塔',
                path: '/sql_config2/index',
                key: '2-1'
            },
            {
                title: '大屏',
                path: '/sql_config3/index',
                key: '2-2'
            },
            {
                title: '数讯传送',
                path: '/sql_config5/index',
                key: '2-4'
            },
            {
                title: '业务系统',
                path: '/sql_config4/index',
                key: '2-3'
            },
            // {
            //   title: '产品研发',
            //   path: '',
            //   key: '2-1',
            // },
            // {
            //   title: '市场运营',
            //   path: '',
            //   key: '2-2',
            // },
            // {
            //   title: '渠道销售',
            //   path: '',
            //   key: '2-3',
            // },
            // {
            //   title: '仓储物流',
            //   path: '',
            //   key: '2-4',
            // },
            // {
            //   title: '财务管理',
            //   path: '',
            //   key: '2-5',
            // },
        ],
    },
    {
        title: '数讯传送',
        key: '3',
        path: '',
        icon: 'line-chart',
        children: [
            {
                title: '数讯传送配置',
                path: '/push_config/index',
                key: '3-1'
            },
        ]
    },
    {
        title: '字典配置',
        key: '4',
        icon: 'profile',
        path: '/dict_config/index'
    }
]
