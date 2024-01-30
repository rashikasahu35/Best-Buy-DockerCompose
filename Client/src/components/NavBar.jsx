import React, { useEffect, useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { FaShoppingCart as CartImg } from "react-icons/fa";
import { HiOutlineMenu as MobileMenuIcon } from "react-icons/hi";
import { IoClose as CloseIcon } from "react-icons/io5";
import { useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";

const NavBar = () => {
    const navigate = useNavigate();
    const { noOfItems } = useSelector((state) => state.cart);
    const { loading, user, userAuthenticated } = useSelector(
        (state) => state.user
    );
    const [mobileMenu, toggleMobileMenu] = useState(false);

    useEffect(() => {}, [userAuthenticated, noOfItems, user]);

    const toggleMenu = () => {
        toggleMobileMenu(!mobileMenu);
    };

    return (
        <header className="header w-full fixed top-0 bg-white shadow-md flex items-center justify-between px-8 py-2 z-20">
            {/* Logo */}
            <div className="w-3/12" onClick={() => navigate("/")}>
                <p className="nav-item font-bold inline-block text-xl">
                    BestBuy
                </p>
            </div>

            {/* Navigation Desktop*/}
            <nav className="nav hidden sm:block font-semibold">
                <ul className="flex gap-1 items-center ">
                    <li className="nav-item">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/products">Products</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/search">Search</NavLink>
                    </li>
                </ul>
            </nav>

            <div className="w-3/12 flex gap-1 justify-end text-base sm:flex hidden ">
                {!loading && (
                    <>
                        {userAuthenticated && (
                            <>
                                <NavLink
                                    to="/cart"
                                    className="nav-item flex align-middle justify-center text-2xl"
                                    onClick={() => navigate("/cart")}
                                >
                                    <CartImg />
                                    <span className="inline h-fit bg-indigo-600 text-white text-xs rounded px-1 ml-[-8px] mt-[-10px]">
                                        {noOfItems}
                                    </span>
                                </NavLink>

                                <NavLink
                                    to="/me"
                                    className="nav-item relative flex align-middle justify-center border-2 rounded-full"
                                >
                                    <img
                                        className=" h-8 w-8 object-cover rounded-full "
                                        src={user?.avatar.url || ""}
                                        alt=""
                                    />
                                </NavLink>
                                {user?.role === "admin" && (
                                    <NavLink
                                        to="/admin/dashboard"
                                        className="nav-item relative flex align-middle justify-center"
                                        
                                    >
                                        <DashboardIcon />
                                    </NavLink>
                                )}
                            </>
                        )}

                        {!userAuthenticated && (
                            <>
                                <div className="nav-item">
                                    <NavLink to="/register">Register</NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink to="/login">Login</NavLink>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>

            {/* Navigation - Mobile */}
            <div className="sm:hidden">
                <button onClick={toggleMenu}>
                    {!mobileMenu && (
                        <MobileMenuIcon className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
                    )}
                    {mobileMenu && (
                        <CloseIcon className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
                <div className="sm:hidden w-full absolute top-16 right-0 bg-white shadow-md py-2 px-4 z-10">
                    <ul className="flex flex-col gap-2 text-left">
                        <li className="">
                            <NavLink
                                to="/"
                                className="nav-item"
                                onClick={toggleMenu}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink
                                to="/products"
                                className="nav-item"
                                onClick={toggleMenu}
                            >
                                Products
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink
                                to="/contact"
                                className="nav-item"
                                onClick={toggleMenu}
                            >
                                Contact
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink
                                to="/search"
                                className="nav-item"
                                onClick={toggleMenu}
                            >
                                Search
                            </NavLink>
                        </li>

                        {!loading && (
                            <>
                                {userAuthenticated && (
                                    <>
                                        <li className="">
                                            <NavLink
                                                to="/cart"
                                                className="nav-item inline-flex items-center text-2xl"
                                            >
                                                <CartImg />
                                                <span className="inline h-fit bg-indigo-600 text-white text-xs rounded px-1 ml-[-8px] mt-[-10px]">
                                                    {noOfItems}
                                                </span>
                                            </NavLink>
                                        </li>

                                        <li className="">
                                            <NavLink
                                                to="/me"
                                                className="nav-item relative inline-flex border-2 rounded-full"
                                            >
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={user?.avatar.url || ""}
                                                    alt="avatar"
                                                />
                                            </NavLink>
                                        </li>
                                        {user?.role === "admin" && (
                                            <li>
                                                <NavLink
                                                    to="/admin/dashboard"
                                                    className="nav-item relative inline-flex border-2 rounded-full"
                                                >
                                                    <DashboardIcon />
                                                </NavLink>
                                            </li>
                                        )}
                                    </>
                                )}
                                {!userAuthenticated && (
                                    <>
                                        <li className="">
                                            <NavLink
                                                to="/register"
                                                className="nav-item"
                                                onClick={toggleMenu}
                                            >
                                                Register
                                            </NavLink>
                                        </li>
                                        <li className="">
                                            <NavLink
                                                to="/login"
                                                className="nav-item"
                                                onClick={toggleMenu}
                                            >
                                                Login
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            </>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default NavBar;
