// src/App.tsx
import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom';
import { routes } from "@/config/routes";
import '@/styles/App.css';
import {Provider} from "react-redux";
import {store} from "./store";

function App() {
    const router = createBrowserRouter(routes as RouteObject[]);

    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;