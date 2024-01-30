import React, { useEffect } from "react";
import SideBar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAsync } from "../../../redux/Product/ProductSlice";
import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import { FaLocationArrow as ArrowIcon } from "react-icons/fa6";

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, products} = useSelector(
        (state) => state.product.productAll
    );

    useEffect(() => {
        dispatch(getAllProductsAsync());
    }, []);
    return (
        <>
            {loading && <Spinner />}
            {!loading && (
                <div className="min-h-screen bg-white">
                    <div className="mt-[60px] text-gray-900 flex flex-wrap gap-x-1">
                        <SideBar />

                        <div className="w-full p-4 sm:ml-60 mt-10 sm:mt-0">
                            <div className="w-full flex flex-col justify-center items-center align-middle gap-y-5">
                                <div className="w-full h-fit flex gap-x-2">
                                    <p className="md:text-2xl text-lg font-bold">
                                        Products
                                    </p>
                                    <div
                                        className="rounded-full p-2 bg-red-400 text-gray-800 font-bold flex items-center justify-center cursor-pointer hover:bg-red-300"
                                        onClick={() => navigate("create")}
                                    >
                                        <AddIcon />
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="w-full overflow-x-auto shadow-md rounded-lg">
                                    <table className="w-full text:sm sm:text-md text-left text-gray-900">
                                        <thead className="text-sm text-white uppercase bg-indigo-600">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Image
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Product ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Price
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Stock
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Manage
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products?.map((product, index) => (
                                                <tr
                                                    className="bg-white border-b hover:bg-gray-100"
                                                    key={index}
                                                >
                                                    <td className="px-6 py-4">
                                                        <img
                                                            src={
                                                                product
                                                                    .images[0]
                                                                    .url || ""
                                                            }
                                                            alt=""
                                                            className=" h-14 w-14 sm:h-20 sm:w-20 rounded"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {product._id}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {product.price}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {product.noOfStock}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Link
                                                            to={`manage/${product._id}`}
                                                            className="font-lg text-indigo-600 flex items-center justify-center"
                                                        >
                                                            <ArrowIcon />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductList;
