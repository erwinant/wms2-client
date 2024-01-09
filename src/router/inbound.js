const inboundRoutes = [
    {
        path: '/inbound',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'inbound-list',
                component: () => import('pages/inbound/InboundList.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: 'new',
                name: 'new-inbound',
                component: () => import('pages/inbound/CreateEditInbound.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: ':id',
                name: 'detail-product',
                component: () => import('pages/inbound/InboundDetail.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: ':id/edit',
                name: 'edit-product',
                component: () => import('pages/inbound/CreateEditInbound.vue'),
                meta: {
                    requireAuth: true,
                },
            },
        ],
    },
];

export default inboundRoutes;
