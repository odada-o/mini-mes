// src/config/routes.tsx
import { RouteObject } from 'react-router-dom';
import { AuthLayout, MainLayout } from "../layouts";
import NotFound from "../pages/NotFound";
import LoginPage from "@/pages/(auth)/LoginPage";
import SignUpPage from "@/pages/(auth)/SignUpPage";
import About from "@/pages/about/About.tsx";
import ListPage from "@/pages/todo/ListPage.tsx";
import ModifyPage from "@/pages/todo/ModifyPage.tsx";
import ReadPage from "@/pages/todo/ReadPage.tsx";

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
                element: <div>Home</div>
            },
            {
                path: 'equipment',
                element: <div>Equipment</div>
            },
            {
                path: 'equipment/:id',
                element: <div>Equipment Detail</div>
            },
            {
                path: 'monitoring',
                element: <div>Monitoring Dashboard</div>
            }
        ]
    },
    {
      path: '/todo',
        element: <MainLayout />,
      children: [
          {
              index: true,
                element: <ListPage />
          },
          {
              path: 'add',
                element: <div>Todo Add</div>
          },
          {
              path: 'modify/:id',
                element: <ModifyPage />
          },
          {
              path: 'read/:id',
              element: <ReadPage />
          }
      ]
    },
    {
        path: '*',
        element: <NotFound />
    },

];