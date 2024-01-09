const outboundRoutes = [
    {
        path: '/outbound',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: 'packing',
                name: 'outbound-packing',
                component: () => import('pages/outbound/Packing.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: 'shipping',
                name: 'outbound-shipping',
                component: () => import('pages/outbound/Shipping.vue'),
                meta: {
                    requireAuth: true,
                },
            },
        ],
    },
];

export default outboundRoutes;
