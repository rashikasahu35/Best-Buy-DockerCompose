import React from "react";
import { useNavigate } from "react-router-dom";
import ProductImg from '../assets/women2.jpg'
import  StarRatings  from "react-star-ratings";


const ProductCard = ({product}) => {
    const navigate = useNavigate();

    return (
        <div
            className="group relative cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}
        >
            <div className="aspect-h-1 aspect-w-1 w-full px-4 overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={product.images[0]?.url || ''}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded"
                />
            </div>
            <div className="mt-2 flex justify-between px-4">
                <div>
                    <h3 className="text-md font-bold text-gray-700">
                        <span
                            aria-hidden="true"
                            className="absolute inset-0"
                        />
                        {product.name}
                    
                    </h3>
                    <div className="flex items-center text-sm flex-wrap">
                        <StarRatings
                            rating={product.ratings}
                            starRatedColor="#1a202c"
                            starEmptyColor="#E2E8F0"
                            starHoverColor="orange"
                            numberOfStars={5}
                            starDimension="15px"
                            starSpacing="1px"
                            allowHalfRating
                            className="h-4 w-4 flex-shrink-0"
                        />
                        <div className="">
                            ({product.noOfReviews} {product.noOfReviews>1? 'reviews':'review'})
                        </div>
                    </div>
                </div>
                <p className="text-sm font-medium text-indigo-600 pt-1">
                    ₹{product.price}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;


