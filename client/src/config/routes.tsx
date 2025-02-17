// src/config/routes.tsx
import { RouteObject } from 'react-router-dom';
import { AuthLayout, MainLayout } from "../layouts";
import NotFound from "../pages/NotFound";
import LoginPage from "@/pages/(auth)/LoginPage";
import SignUpPage from "@/pages/(auth)/SignUpPage";
import EquipmentListPage from "@/pages/equipmentlist/EquipmentListPage.tsx";
import EquipmentDetailPage from "@/pages/equipmentlist/EquipmentDetailPage.tsx";
import MonitoringDashboardPage from "@/pages/equipmentlist/MonitoringDashboardPage.tsx";
import About from "@/pages/about/About.tsx";

export const routes: RouteObject[] = [
    {
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'signup',
                element: <SignUpPage />
            }
        ]
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <EquipmentListPage />
            },
            {
                path: 'equipment',
                element: <EquipmentListPage />
            },
            {
                path: 'equipment/:id',
                element: <EquipmentDetailPage />
            },
            {
                path: 'monitoring',
                element: <MonitoringDashboardPage />
            }
        ]
    },
    {
      path: '/todo',
        element: <MainLayout />,
      children: [
          {
              index: true,
                element: <div>Todo List</div>
          },
          {
              path: 'add',
                element: <div>Todo Add</div>
          },
          {
              path: 'modify/:id',
                element: <div>Todo Modify</div>
          },
          {
              path: 'read/:id',
              element: <div>Todo Read</div>
          }
      ]
    },
    {
        path: '*',
        element: <NotFound />
    },

];