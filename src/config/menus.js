const menus = [
    {
        title: 'Dashboard',
        icon: 'o_space_dashboard',
        path: '/',
        roles: ['superadmin'],
    },
    {
        title: 'Inbound',
        icon: 'o_archive',
        path: '/inbound',
        roles: ['superadmin'],
    },
    {
        title: 'Orders',
        icon: 'o_shopping_bag',
        path: '/orders',
        children: [
            { title: 'Create Wave', path: '/orders/create', roles: ['superadmin'] },
            {
                title: 'Monitoring',
                path: '/orders/monitoring',
                roles: ['superadmin'],
            },
        ],
    },
    {
        title: 'Outbound',
        icon: 'o_local_shipping',
        path: '/outbound',
        children: [
            { title: 'Packing', path: '/outbound/packing', roles: ['superadmin'] },
            { title: 'Shipping', path: '/outbound/shipping', roles: ['superadmin'] },
        ],
    },
    {
        title: 'Products',
        icon: 'o_category',
        path: '/products',
        children: [
            { title: 'Master Product', path: '/products', roles: ['superadmin'] },
            { title: 'Brands', path: '/products/brands', roles: ['superadmin'] },
            {
                title: 'Categories',
                path: '/products/categories',
                roles: ['superadmin'],
            },
            { title: 'Variants', path: '/products/variants', roles: ['superadmin'] },
            {
                title: 'Stock Log',
                path: '/products/stock-log',
                roles: ['superadmin'],
            },
        ],
    },
    {
        title: 'Warehouses',
        icon: 'o_pin_drop',
        path: '/warehouses',
        roles: ['superadmin'],
    },
    {
        title: 'Setting',
        icon: 'o_settings',
        path: '/setting',
        children: [{ title: 'App', path: '/setting/app', roles: ['superadmin'] }],
    },

    {
        title: 'Miscellaneous',
        icon: 'miscellaneous_services',
        roles: ['superadmin'],
        children: [
            {
                title: 'Users',
                icon: 'o_people',
                path: '/user',
                roles: ['superadmin'],
            },
            {
                title: 'Merchant',
                icon: 'o_storefront',
                path: '/merchant',
                roles: ['superadmin'],
            },
            {
                title: 'Audit Log',
                icon: 'webhook',
                path: '/audit-logs',
                roles: ['superadmin'],
            },
        ],
    },
];

export default menus;
