const userRoutes = [
    {
        path: '/user',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'root-user',
                component: () => import('pages/user/UserList.vue'),
                meta: {
                    requireAuth: true,
                },
                children: [
                    {
                        path: ':id',
                        name: 'maintain-user',
                        component: () => import('pages/user/Profile.vue'),
                        meta: {
                            requireAuth: true,
                        },
                    },
                ],
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('pages/user/Profile.vue'),
                meta: {
                    requireAuth: true,
                },
            },
        ],
    },
];

export default userRoutes;
