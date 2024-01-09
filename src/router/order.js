const orderRoutes = [
    {
        path: '/orders',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: 'create',
                name: 'create-wave',
                component: () => import('pages/orders/WaveCreate.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: 'monitoring',
                name: 'wave-monitoring',
                component: () => import('pages/orders/WaveMonitoring.vue'),
                meta: {
                    requireAuth: true,
                },
            },
        ],
    },
];

export default orderRoutes;
