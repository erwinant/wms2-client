const auditLogsRoutes = [
  {
    path: "/audit-logs",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "root-audit-logs",
        component: () => import("pages/audit-logs/AuditLogsList.vue"),
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
];

export default auditLogsRoutes;
