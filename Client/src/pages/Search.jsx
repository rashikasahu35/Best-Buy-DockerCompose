import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import {
    getProductSearchAsync,
    CLEAR_PRODUCT_SEARCH,
} from "../redux/Product/ProductSlice";
import Spinner from "../components/Spinner";

const Search = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const { loading, products, productCount } = useSelector(
        (state) => state.product.productSearch
    );

    const searchProduct = async (e) => {
        if (e.code != "Enter") {
            if (products) {
                dispatch(CLEAR_PRODUCT_SEARCH());
            }
        } else {
            dispatch(getProductSearchAsync({ query }));
        }
    };

    return (
        <>
            {loading && <Spinner />}
            {!loading && (
                <div className="mt-[80px] flex justify-center items-center  flex-col p-4">
                    <div className="w-full flex justify-center items-center gap-5 ">
                        <label
                            htmlFor="price"
                            className="block leading-6 text-gray-900 text-lg sm:text-3xl"
                        >
                            Search
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="text-lg sm:text-2xl block w-full rounded-md border-0 py-2 px-5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                placeholder="Search products.."
                                value={query}
                                maxLength={20}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchProduct}
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center flex-col">
                        {productCount == 0 && (
                            <p className="text-xl font-bold leading-9 tracking-tight text-indigo-600 mt-6">
                                Sorry, no product found for '{query}'
                            </p>
                        )}
                        {products && productCount > 0 && (
                            <div className="w-full flex flex-wrap gap-4 justify-center p-2 pt-4">
                                {products.map((product, index) => (
                                    <ProductCard
                                        product={product}
                                        key={index}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Search;
