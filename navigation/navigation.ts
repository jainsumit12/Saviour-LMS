export const routeConfig = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "tabler:layout-dashboard",
    subject: "dashboard",
    action: "read",
  },
  {
    title: "Designation",
    path: "/designation",
    icon: "tabler:user-check",
    subject: "designation",
    action: "read",
  },
  {
    title: "Designation Options",
    path: "/module",
    icon: "tabler:versions",
    subject: "modules",
    action: "read",
  },

  {
    title: "Institute",
    path: "/institute",
    icon: "tabler:versions",
    subject: "modules",
    action: "read",
    children: [
      {
        title: "View All Institutes",
        path: "/institute",
        icon: "tabler:menu-deep",
        subject: "modules",

        action: "read",
      },
      {
        title: "Add Institute",
        path: "/module",
        icon: "tabler:circle-dashed-plus",
        subject: "modules",
        action: "read",
      },
    ],
  },
  {
    title: "Courses",
    path: "/courses",
    icon: "tabler:versions",
    subject: "modules",
    action: "read",
  },
  {
    title: "Parnters",
    path: "/partners",
    icon: "tabler:versions",
    subject: "modules",
    action: "read",
  },
  {
    title: "Students",
    path: "/students",
    icon: "tabler:versions",
    subject: "modules",
    action: "read",
  },
];
