// src/layouts/MainLayout/MainLayout.tsx
import { Outlet, NavLink } from 'react-router-dom';

const MainLayout = () => {

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="bg-gray-800 text-white">
                <div className="p-4">
                    {/*<img src="/images/logo.gif" alt="Nautilus Hyosung" className="h-8" />*/}
                </div>

                <nav className="mt-8">
                    <div className="px-2 space-y-1">
                        <NavLink
                            to="/equipment"
                            className={({ isActive }) =>
                                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            Equipment
                        </NavLink>
                        <NavLink
                            to="/order"
                            className={({ isActive }) =>
                                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            Order
                        </NavLink>
                        <NavLink
                            to="/rma"
                            className={({ isActive }) =>
                                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            RMA
                        </NavLink>
                        <NavLink
                            to="/inventory"
                            className={({ isActive }) =>
                                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            Inventory
                        </NavLink>
                        <NavLink
                            to="/training"
                            className={({ isActive }) =>
                                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            Training
                        </NavLink>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                        {/*<h1 className="text-lg font-semibold text-gray-900">*/}
                        {/*    Welcome, {user?.name}*/}
                        {/*</h1>*/}
                        {/*<div className="flex items-center space-x-4">*/}
                        {/*    <Button*/}
                        {/*        variant="outline"*/}
                        {/*        onClick={handleLogout}*/}
                        {/*    >*/}
                        {/*        Log out*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;