import React, { useState } from "react";
import SideBar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import { FaLocationArrow as ArrowIcon } from "react-icons/fa6";
import { getProductReviewAsync } from "../../../redux/ProductReview/ProductReviewSlice";

const ProductReviewList = () => {
    const dispatch = useDispatch();
    const { loading, reviews } = useSelector(
        (state) => state.productReview.getProductReview
    );
    const [productId, setProductId] = useState("");

    const getProductReviewHandler = async (e) => {
        if (e.code != "Enter") return;
        dispatch(getProductReviewAsync(productId));
    };



    
    return (
        <>
            <div className="min-h-screen bg-white">
                <div className="mt-[60px] text-gray-900 flex flex-wrap gap-x-1">
                    <SideBar />
                    <div className="w-full p-4 sm:ml-60 mt-10 sm:mt-0 ">
                        <div className="w-full flex flex-col justify-center items-center align-middle gap-y-5">
                            <div className="w-full h-fit flex justify-center items-center gap-x-2 ">
                                <label
                                    htmlFor="price"
                                    className="block leading-6 text-gray-900 text-xl sm:text-3xl"
                                >
                                    Search by Product Id:
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="search"
                                        id="search"
                                        className="text-lg sm:text-2xl block w-full rounded-md border-0 py-2 px-5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                        placeholder="Search product reviews.."
                                        value={productId}
                                        onChange={(e) =>
                                            setProductId(e.target.value)
                                        }
                                        onKeyUp={getProductReviewHandler}
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            {loading && <Spinner />}
                            {!loading && (
                                <div className="w-full overflow-x-auto shadow-md rounded-lg">
                                    <table className="w-full text:sm sm:text-md text-left text-gray-900">
                                        <thead className="text-sm text-white uppercase bg-indigo-600">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Review ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    User
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Rating
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Comment
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
                                            {reviews?.map((review, index) => (
                                                <tr
                                                    className="bg-white border-b hover:bg-gray-100"
                                                    key={index}
                                                >
                                                    <td className="px-6 py-4">
                                                        {review._id}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {review.user?.id}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {review.rating}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {review.comment}
                                                    </td>
                                                    <td className="px-6 py-4 flex items-center justify-center">
                                                        <Link
                                                            to={`manage/${review._id}`}
                                                            className="font-lg text-indigo-600"
                                                        >
                                                            <ArrowIcon />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductReviewList;
