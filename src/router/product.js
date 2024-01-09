const productRoutes = [
    {
        path: '/products',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'master-product',
                component: () => import('pages/product/ProductList.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: 'new',
                name: 'new-product',
                component: () => import('pages/product/CreateEditProduct.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: ':id',
                name: 'detail-product',
                component: () => import('pages/product/ProductDetail.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: ':id/edit',
                name: 'edit-product',
                component: () => import('pages/product/CreateEditProduct.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: 'brands',
                name: 'master-brand',
                component: () => import('pages/product/BrandList.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: 'categories',
                name: 'master-category',
                component: () => import('pages/product/CategoryList.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: 'variants',
                name: 'master-variant',
                component: () => import('pages/product/VariantList.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: 'batchs',
                name: 'batch-product',
                component: () => import('pages/product/Batchs.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: 'stock-log',
                name: 'stock-log',
                component: () => import('pages/product/StockLog.vue'),
                meta: {
                    requireAuth: true,
                },
            },
        ],
    },
];

export default productRoutes;
