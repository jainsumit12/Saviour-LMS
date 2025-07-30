import { RouteConfig } from "@/types/types";

export const routeConfig:RouteConfig = {
  "admin": [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "tabler:layout-dashboard",
      subject: "dashboard",
      action: "read",
    },
    {
      title: "Institute",
      path: "/institute",
      icon: "tabler:buildings",
      subject: "institute",
      action: "read",
      children: [
        {
          title: "View All Institutes",
          path: "/institute",
          icon: "tabler:menu-deep",
          subject: "institute",
          action: "read",
        },
        {
          title: "Add Institute",
          path: "/institute/add",
          icon: "tabler:circle-dashed-plus",
          subject: "institute",
          action: "read",
        },
      ],
    },
    {
      title: "Courses",
      path: "/courses",
      icon: "tabler:book",
      subject: "courses",
      action: "read",
      children: [
        {
          title: "View All Courses",
          path: "/institute",
          icon: "tabler:menu-deep",
          subject: "modules",
          action: "read",
        },
        {
          title: "Add Institute",
          path: "/institute/add",
          icon: "tabler:circle-dashed-plus",
          subject: "modules",
          action: "read",
        },
      ],
    },
    {
      title: "Partners",
      path: "/partners",
      icon: "tabler:friends",
      subject: "partners",
      action: "read",
    },
    {
      title: "Students",
      path: "/students",
      icon: "tabler:school",
      subject: "students",
      action: "read",
    },
    {
      title: "Course Management",
      path: "/course-management",
      icon: "tabler:versions",
      subject: "course-management",
      action: "read",
      children: [
        {
          title: "View All Courses",
          path: "/course-management",
          icon: "tabler:menu-deep",
          subject: "modules",
          action: "read",
        },
        {
          title: "Add Course",
          path: "/course-management/add",
          icon: "tabler:circle-dashed-plus",
          subject: "modules",
          action: "read",
        },
      ],
    },
    {
      title: "Payments",
      path: "/payments",
      icon: "tabler:credit-card",
      subject: "payments",
      action: "read",
    },
  ],
  "partner":[],
  "institute":[],
  "student":[]
  
};
