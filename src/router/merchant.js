const merchantRoutes = [
    {
        path: '/merchant',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'root-merchant',
                component: () => import('pages/merchant/MerchantList.vue'),
                meta: {
                    requireAuth: true,
                },
            },
        ],
    },
];

export default merchantRoutes;
