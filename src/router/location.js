const locationRoutes = [
    {
        path: '/warehouses',
        name: 'warehouse-list',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'root-warehouse-list',
                component: () => import('pages/location/WarehouseList.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: ':id/zones',
                name: 'zone-list',
                component: () => import('pages/location/ZoneList.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: ':id/aisles',
                name: 'aisle-list',
                component: () => import('pages/location/ZoneList.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: ':id/racks',
                name: 'rack-list',
                component: () => import('pages/location/ZoneList.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: ':id/shelves',
                name: 'shelf-list',
                component: () => import('pages/location/ZoneList.vue'),
                meta: {
                    requireAuth: true,
                },
            },
        ],
    },
];

export default locationRoutes;
