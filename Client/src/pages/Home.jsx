import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { getProductListAsync } from "../redux/Product/ProductSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import women1 from "../assets/women1.jpg";
import women2 from "../assets/women2.jpg";
import men1 from "../assets/men1.jpg";
import men2 from "../assets/men3.jpg";

const Home = () => {
    const dispatch = useDispatch();
    const { loading, products, productCount } = useSelector(
        (state) => state.product.productList
    );
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getProductListAsync({ page }));
    }, [page, dispatch]);

    return (
        <>
            {loading && <Spinner />}
            {!loading && (
                <>
                    <div className=" mt-[10px] relative overflow-hidden bg-white pt-10 sm:pt-[100px] z-1">
                        {/* hero banner */}
                        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                                <div className="sm:max-w-lg ">
                                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                        Final Stock.
                                        <br />
                                        Up to 50% off.
                                    </h1>
                                </div>
                                <div>
                                    <div className="mt-10">
                                        {/* Decorative image grid */}
                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full"
                                        >
                                            <div className="mt-[32px] absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                                <div className="flex items-center space-x-6 lg:space-x-8">
                                                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                        <div className="h-44 w-44 sm:h-72 sm:w-60 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                            <img
                                                                src={women1}
                                                                alt="image"
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div className="h-32 w-44 sm:h-72 sm:w-60 overflow-hidden rounded-lg">
                                                            <img
                                                                src={men1}
                                                                alt="image"
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                        <div className="h-44 w-44 sm:h-72 sm:w-60 overflow-hidden rounded-lg">
                                                            <img
                                                                src={men2}
                                                                alt="image"
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div className="h-44 w-44 sm:h-72 sm:w-60 overflow-hidden rounded-lg">
                                                            <img
                                                                src={women2}
                                                                alt="image"
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <a
                                            href="#home-trending-products"
                                            className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                                        >
                                            Shop Collection
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {products && (
                        <div id="home-trending-products" className="bg-white">
                            <div className="mx-auto max-w-2xl px-6 pt-10 sm:py-10 lg:max-w-7xl lg:px-8">
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                    Trending Products
                                </h2>

                                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 xl:gap-x-8">
                                    {products?.map((product, index) => (
                                        <ProductCard
                                            product={product}
                                            key={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <Pagination
                        page={page}
                        setPage={setPage}
                        productCount={productCount}
                    />
                </>
            )}
        </>
    );
};

export default Home;
