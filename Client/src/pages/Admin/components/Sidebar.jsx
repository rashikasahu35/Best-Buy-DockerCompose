import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ChatIcon from '@mui/icons-material/Chat';


const SideBar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <>
            {/* Menu icon */}
            <button
                type="button"
                className="absolute inline-flex items-center p-2 m-2 ms-3 text-sm bg-gray-300 text-gray-500 rounded-full sm:hidden focus:outline-none focus:ring-2  hover:text-gray-200 hover:bg-gray-600"
                onClick={() => setShowSidebar(true)}
            >
                <MenuIcon />
            </button>

            <aside
                id="default-sidebar"
                className={`${showSidebar? 'block':'hidden'} sm:block fixed top-[60px] left-0 z-5 w-48 sm:w-60 h-full  bg-gray-50`}
                aria-label="Sidebar"
            >
                <div className="sm:hidden w-full flex items-center justify-end pt-1 px-2 text-sm text-gray-500 focus:outline-none focus:ring-2">
                    <button
                        className="inline hover:text-gray-200 hover:bg-gray-600 rounded"
                        onClick={() => setShowSidebar(false)}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="h-full px-3 py-0 sm:py-3 overflow-y-auto bg-gray-50">
                    <div className="flex flex-col gap-y-2 font-medium sm:text-lg">
                        <NavLink
                            to="/admin/dashboard"
                            className="h-10 flex gap-2 items-center p-2 font-bold text-gray-700 hover:text-indigo-600 rounded-lg  hover:bg-gray-200 group"
                        >
                            <div className="w-5 h-5 transition duration-75">
                                <DashboardIcon />
                            </div>
                            <div className="pt-2">Dashboard</div>
                        </NavLink>
                        <NavLink
                            to="/admin/users"
                            className="h-10 flex gap-2 items-center p-2 font-bold text-gray-700 hover:text-indigo-600 rounded-lg  hover:bg-gray-200 group"
                        >
                            <div className="w-5 h-5 transition duration-75">
                                <PeopleIcon />
                            </div>
                            <div className="pt-2">Users</div>
                        </NavLink>
                        <NavLink
                            to="/admin/products"
                            className="h-10 flex gap-2 items-center p-2 font-bold text-gray-700 hover:text-indigo-600 rounded-lg  hover:bg-gray-200 group"
                        >
                            <div className="w-5 h-5 transition duration-75">
                                <ShoppingBagIcon />
                            </div>
                            <div className="pt-2">Products</div>
                        </NavLink>
                        <NavLink
                            to="/admin/productReview"
                            className="h-10 flex gap-2 items-center p-2 font-bold text-gray-700 hover:text-indigo-600 rounded-lg  hover:bg-gray-200 group"
                        >
                            <div className="w-5 h-5 transition duration-75">
                                <ChatIcon />
                            </div>
                            <div className="pt-2">Product Review</div>
                        </NavLink>
                        <NavLink
                            to="/admin/cart"
                            className="h-10 flex gap-2 items-center p-2 font-bold text-gray-700 hover:text-indigo-600 rounded-lg  hover:bg-gray-200 group"
                        >
                            <div className="w-5 h-5 transition duration-75">
                                <ShoppingCartIcon />
                            </div>
                            <div className="pt-2">Cart</div>
                        </NavLink>
                        <NavLink
                            to="/admin/orders"
                            className="h-10 flex gap-2 items-center p-2 font-bold text-gray-700 hover:text-indigo-600 rounded-lg  hover:bg-gray-200 group"
                        >
                            <div className="w-5 h-5 transition duration-75">
                                <ShoppingBasketIcon />
                            </div>
                            <div className="pt-2">Orders</div>
                        </NavLink>
                        
                    </div>
                </div>
            </aside>
        </>
    );
};


export default SideBar
