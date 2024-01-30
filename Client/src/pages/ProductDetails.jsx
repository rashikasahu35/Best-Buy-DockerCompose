import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    FaPlus as Plus,
    FaMinus as Minus,
    FaStar as StarIcon
} from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { IoClose as CloseIcon } from "react-icons/io5";
import Spinner from "../components/Spinner";
import { getProductDetailsAsync } from "../redux/Product/ProductSlice";
import {
    getProductReviewAsync,
    addProductReviewAsync,
} from "../redux/ProductReview/ProductReviewSlice";
import { addItemInCartAsync } from "../redux/Cart/CartSlice";
import Carousel from "../components/Carousel";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, product } = useSelector(
        (state) => state.product.productDetails
    );
    const { loading: productReviewLoading, reviews } = useSelector(
        (state) => state.productReview.getProductReview
    );
    const { loading: cartLoading } = useSelector((state) => state.cart);
    const [quantity, setquantity] = useState(0);
    const [reviewForm, openReviewForm] = useState(false);
    const [showQuantityError, setShowQuantityError] = useState(false);
    const [showDeleteReviewBtn, setShowDeleteReviewBtn] = useState(false);
    

    const addItemInCartHandler = (e) => {
        e.preventDefault();
        dispatch(
            addItemInCartAsync({
                product: product._id,
                name: product.name,
                quantity,
                price: product.price,
                image: product.images[0].url,
            })
        );
    };

    useEffect(() => {
        dispatch(getProductDetailsAsync(id));
        dispatch(getProductReviewAsync(id));
    }, [dispatch]);


    
    return (
        <>
            {(loading || productReviewLoading) && <Spinner />}
            {product && reviews && (
                <>
                    <div
                        className={`bg-white mt-[50px] ${
                            reviewForm
                                ? "inset-0 bg-gray-800 bg-opacity-50 blur-md"
                                : ""
                        }`}
                    >
                        <div className="pt-6">
                            {/* Image gallery */}
                            <Carousel images={product.images} />

                            {/* Product info */}
                            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                        {product.name}
                                    </h1>
                                </div>

                                {/* Price */}
                                <div className="mt-4 lg:row-span-3 lg:mt-0 flex flex-col gap-6">
                                    <h2 className="sr-only">
                                        Product information
                                    </h2>
                                    <p className="text-3xl tracking-tight text-gray-900">
                                        ₹{product.price}
                                    </p>

                                    {/* Reviews */}
                                    <div className="w-full">
                                        <h3 className="sr-only">Reviews</h3>
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                <StarRatings
                                                    rating={product.ratings}
                                                    starRatedColor="#1a202c"
                                                    starEmptyColor="#E2E8F0"
                                                    starHoverColor="orange"
                                                    numberOfStars={5}
                                                    starDimension="20px"
                                                    starSpacing="1px"
                                                    allowHalfRating
                                                    className="h-4 w-4 flex-shrink-0"
                                                />
                                            </div>
                                            <p className="sr-only">
                                                {product.ratings} out of 5 stars
                                            </p>
                                            <a
                                                href=""
                                                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                ({product.noOfReviews}{" "}
                                                {product.noOfReviews > 1
                                                    ? "reviews"
                                                    : "review"}
                                                )
                                            </a>
                                        </div>
                                    </div>

                                    {/* In/Out of stock */}
                                    <div className="w-full">
                                        Status:{" "}
                                        <span className="font-bold">
                                            {product.noOfStock > 0
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </span>
                                    </div>

                                    {/* Add to bag */}
                                    <form className="flex justify-center align-middle gap-4">
                                        {product.noOfStock > 0 && (
                                            <div className="flex gap-1 align-middle mt-3">
                                                <div
                                                    className="cursor-pointer text-lg mt-1"
                                                    onClick={() => {
                                                        if (
                                                            product.noOfStock >
                                                            quantity
                                                        ) {
                                                            setShowQuantityError(
                                                                false
                                                            );
                                                            setquantity(
                                                                quantity + 1
                                                            );
                                                        } else {
                                                            setShowQuantityError(
                                                                true
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <Plus />
                                                </div>
                                                <div className="text-bold p-1 px-2 mb-2 bg-indigo-600 rounded text-white">
                                                    {quantity}
                                                </div>
                                                <div
                                                    className="cursor-pointer text-lg mt-1"
                                                    onClick={() => {
                                                        if (quantity > 0) {
                                                            setShowQuantityError(
                                                                false
                                                            );
                                                            setquantity(
                                                                quantity - 1
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <Minus />
                                                </div>
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={!quantity || cartLoading}
                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed"
                                            onClick={(e) =>
                                                addItemInCartHandler(e)
                                            }
                                        >
                                            {cartLoading
                                                ? "Processing..."
                                                : "Add to bag"}
                                        </button>
                                    </form>
                                    {showQuantityError && (
                                        <p className="text-red-500">
                                            Only {product.noOfStock} items in
                                            stock
                                        </p>
                                    )}
                                </div>

                                {/* Description and details */}
                                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                    <div>
                                        <h3 className="sr-only">Description</h3>
                                        <p className="text-base text-gray-900">
                                            {product.description}
                                        </p>

                                        <button
                                            onClick={() => openReviewForm(true)}
                                            className="mt-5 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Submit Review
                                        </button>
                                        {showDeleteReviewBtn && (
                                            <button
                                                onClick={() =>
                                                    openReviewForm(true)
                                                }
                                                className="mt-5 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Delete Review
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Review from users */}
                                {reviews?.length > 0 && (
                                    <div className="flex flex-col justify-center">
                                        <h2 className="text-2xl md:text-4xl font-bold mb-5">
                                            Reviews
                                        </h2>
                                        <div className="flex gap-5 mt-4">
                                            {/* {(user && user._id && review.user === user._id) && showDeleteReviewBtn(true)} */}
                                            {reviews?.map((review, index) => (
                                                <ProductReviewCard
                                                    review={review}
                                                    key={index}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* product review form */}
                    <div>
                        {reviewForm && (
                            <ProductReviewForm
                                openReviewForm={openReviewForm}
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default ProductDetails;

const ProductReviewForm = ({ openReviewForm }) => {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null)
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.productReview.addReview);

    const submitReview = async (e) => {
        e.preventDefault();
        if(!rating){
            setError("Please enter your rating")
            return
        }
        else setError(null)
        dispatch(addProductReviewAsync({ id, rating, comment }));
    };

    return (
        <div className=" text-black absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center rounded max-h-screen max-w-screen text-lg md:text-2xl">
            <form
                onSubmit={(e) => submitReview(e)}
                className="bg-white inline-block w-2/3 lg:w-2/5 mx-auto my-8 px-6 py-4 rounded shadow-md"
            >
                <div
                    onClick={() => openReviewForm(false)}
                    className="width-full flex justify-end font-bold cursor-pointer text-xl "
                >
                    <CloseIcon />
                </div>
                <div className="mb-4 w-full">
                    <label
                        htmlFor="rating"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Rating
                    </label>
                    <div className="width-full flex gap-1">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <StarIcon
                                key={index}
                                className={classNames(
                                    rating < index
                                        ? "text-gray-200"
                                        : "text-gray-900",
                                    "h-5 w-5 flex-shrink-0 cursor-pointer"
                                )}
                                aria-hidden="true"
                                onClick={(e) => setRating(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="comment"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                        placeholder="Leave a comment.."
                        rows={5}
                        className="w-full border-gray-300 rounded-md p-2"
                    ></textarea>
                <div className="text-red-600 text-sm">{error}</div>
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

const ProductReviewCard = ({ review }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 p-4 px-6 bg-gray-200 text-black rounded">
            <div className="flex flex-col gap-2 justify-center items-center md:w-40 text-center">
                <h3 className="text-md md:text-xl font-bold">
                    {review.user?.name}
                </h3>
                <div className="width-full flex items-center justify-center align-middle">
                    <StarRatings
                        rating={review.rating}
                        starRatedColor="#1a202c"
                        starEmptyColor="#E2E8F0"
                        starHoverColor="orange"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="1px"
                        allowHalfRating
                        className="h-2 w-2 flex-shrink-0"
                    />
                </div>
                <p className="text-gray-700 pt-3">{review.comment}</p>
            </div>
        </div>
    );
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
