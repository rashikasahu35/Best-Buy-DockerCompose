import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import {
    updateProductReviewAsync,
    deleteProductReviewAsync,
    getReviewAsync,
    CLEAR_DELETE_PRODUCT_REVIEW
} from "../../../redux/ProductReview/ProductReviewSlice";

const ProductReviewManage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading, review } = useSelector(
        (state) => state.productReview.getReview
    );
    const { loading: productReviewUpdateLoading } = useSelector(
        (state) => state.productReview.updateReview
    );
    const { loading: productReviewDeleteLoading, success : productReviewDeleteSuccess } = useSelector(
        (state) => state.productReview.deleteReview
    );
    const [inputData, setInputData] = useState({
        rating : 0,
        comment : ''

    });
    const [ratingError, setRatingError] = useState(null);

    const setInputDataHandler = (key, value) => {
        setInputData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };
    const updateHandler = (e) => {
        e.preventDefault()
        if (inputData.rating < 0 || inputData.rating > 5) {
            setRatingError("Rating must be from 0 to 5");
            return
        } else {
            setRatingError(null);
        }
        dispatch(
            updateProductReviewAsync({
                id,
                rating: inputData.rating,
                comment: inputData.comment,
            })
        );
    };
    const deleteHandler = (e) => {
        e.preventDefault()
        dispatch(deleteProductReviewAsync(id));
    };

    useEffect(() => {
        if (review) {
            setInputData({
                rating: review.rating,
                comment: review.comment,
            });
        }
        if(productReviewDeleteSuccess){
            dispatch(CLEAR_DELETE_PRODUCT_REVIEW())
            setInputData({
                rating : 0,
                comment : ''
            })
            navigate("/admin/productReview");
        }

    }, [review, productReviewDeleteSuccess]);

    useEffect(() => {
        dispatch(getReviewAsync(id));
    }, []);

    return (
        <>
            {(loading || !inputData) && <Spinner />}
            {(!loading) &&  (
                <div className="min-h-screen bg-gray-100 overflow-x-scroll">
                    <div className="mt-[60px] text-gray-900 flex flex-wrap gap-x-1">
                        <SideBar />
                        <div className="w-full min-h-screen  p-4 sm:ml-60 mt-2 sm:mt-0 flex justify-center">
                            <div className="w-full h-fit md:w-4/5 lg:w-3/5 flex flex-col gap-y-2 bg-white rounded shadow-lg p-4 md:px-8">
                                <div className="font-bold w-full text-lg sm:text-xl md:text-2xl text-center">
                                    Manage Product review
                                </div>

                                <form
                                    className="space-y-2"
                                    method="POST"
                                    encType="multipart/form-data"
                                >
                                    <div>
                                        <label
                                            htmlFor="rating"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Rating
                                        </label>
                                        <input
                                            id="rating"
                                            name="rating"
                                            type="number"
                                            min={1}
                                            max={5}
                                            value={inputData?.rating}
                                            onChange={(e) =>
                                                setInputDataHandler(
                                                    "rating",
                                                    e.target.value
                                                )
                                            }
                                            maxLength={30}
                                            placeholder="5"
                                            className="pl-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <div className="text-red-500 text-xs">
                                            {ratingError}
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="comment"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Comment
                                        </label>
                                        <textarea
                                            id="comment"
                                            name="comment"
                                            type="text"
                                            value={inputData?.comment}
                                            onChange={(e) =>
                                                setInputDataHandler(
                                                    "comment",
                                                    e.target.value
                                                )
                                            }
                                            rows={4}
                                            placeholder="write some comment.."
                                            className="pl-2 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>

                                    <div className="flex justify-around gap-x-2">
                                        <input
                                            type="submit"
                                            value={`${
                                                productReviewUpdateLoading
                                                    ? "Updating..."
                                                    : "Update"
                                            }`}
                                            className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 cursor-pointer disabled:cursor-not-allowed"
                                            onClick={updateHandler}
                                            disabled={
                                                productReviewUpdateLoading
                                            }
                                        />
                                        <input
                                            type="submit"
                                            value={`${
                                                productReviewDeleteLoading
                                                    ? "Deleting..."
                                                    : "Delete"
                                            }`}
                                            className="mt-4 flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
                                            onClick={deleteHandler}
                                            disabled={
                                                productReviewDeleteLoading
                                            }
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}{" "}
        </>
    );
};

export default ProductReviewManage;
