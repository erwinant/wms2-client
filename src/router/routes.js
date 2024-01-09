import productRoutes from './product';
import outboundRoutes from './outbound';
import orderRoutes from './order';
import locationRoutes from './location';
import userRoutes from './user';
import merchantRoutes from './merchant';
import auditLogsRoutes from './audit-logs';

const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: '/inbound',
                name: 'inbound',
                component: () => import('pages/inbound/InboundList.vue'),
                meta: {
                    requireAuth: true,
                },
            },
        ],
    },
    ...userRoutes,
    ...merchantRoutes,
    ...orderRoutes,
    ...outboundRoutes,
    ...productRoutes,
    ...locationRoutes,
    ...auditLogsRoutes,
    {
        path: '/login',
        component: () => import('layouts/BlankLayout.vue'),
        children: [
            {
                path: '',
                name: 'login',
                component: () => import('pages/LoginPage.vue'),
                meta: {
                    authPage: true,
                },
            },
        ],
    },
    {
        path: '/redirect/merchant/:code/:appkey',
        component: () => import('pages/LandingOAuth.vue'),
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];
export default routes;
