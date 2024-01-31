import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart as CartImg } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { getCartItemsAsync, CLEAR_GET_CART_ERROR } from "../redux/Cart/CartSlice";
import { SET_ORDER_PRICE } from "../redux/Order/OrderSummary";
import ShowError from "../utils/ShowError";
import { FaPlus as Plus, FaMinus as Minus } from "react-icons/fa";
import { deleteItemFromCartAsync,  updateProductQuantityAsync } from "../redux/Cart/CartSlice";


const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, cart, noOfItems } = useSelector((state) => state.cart);
    const { error } = useSelector((state) => state.cart.getCartItems);
    
    
    useEffect(() => {
        if(cart) {
            dispatch(SET_ORDER_PRICE(cart?.subTotal));
        }
        if(error){
            ShowError(error)
            dispatch(CLEAR_GET_CART_ERROR()) 
        }
    }, [cart, error]);
    

    return (
        <>
            {loading && <Spinner />}
            {!loading && (
                <>
                <div className=" mt-[100px] max-w-full">
                    <div className="container mx-auto">
                        {/* if cart has items */}
                        {noOfItems>0 && (
                            <div className="flex shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
                                <div className="w-full p-10 ">
                                    <div className="flex justify-between border-b pb-4">
                                        <h1 className="font-semibold text-xl md:text-2xl">
                                            Shopping Cart
                                        </h1>
                                        <h2 className="font-semibold text-xl md:text-2xl">
                                            {cart?.noOfItems}{" "}
                                            {cart?.noOfItems > 1
                                                ? "Items"
                                                : "Item"}
                                        </h2>
                                    </div>

                                    {/* heading */}
                                    <div className="flex mt-10 mb-5 text-xs text-gray-600">
                                        <h3 className="font-semibold  uppercase w-3/5">
                                            Product Details
                                        </h3>
                                        <h3 className="font-semibold text-center uppercase w-1/5">
                                            Quantity
                                        </h3>
                                        <h3 className="font-semibold text-center uppercase w-1/5">
                                            Price
                                        </h3>
                                    </div>

                                    <div className="flex flex-col pb-4 border-b-2 border-gray-200">
                                        {cart?.products?.map((product, index) => (
                                            <CartProduct
                                                product={product}
                                                key={index}
                                            />
                                        ))}
                                    </div>

                                    {/* subTotal */}
                                    <div className="w-full px-4 pt-4 flex justify-between font-semibold text-xl">
                                        <div>SubTotal</div>
                                        <div className="pr-0 md:pr-6 lg:pr-10 xl:pr-16">
                                            ₹{cart?.subTotal}
                                        </div>
                                    </div>

                                    {/* Checkout */}
                                    <div className="w-full flex justify-end mt-6 md:px-6">
                                        <button
                                            onClick={() =>
                                                navigate("/checkout")
                                            }
                                            className=" bg-indigo-600 font-semibold hover:bg-indigo-700 rounded p-3 px-4 md:px-10 text-sm text-white uppercase"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* if cart does'nt items */}
                        {noOfItems == 0 && 
                         <div className="text-indigo-600 text-2xl text-center p-4">
                            <div className="text-5xl flex items-center justify-center text-red-400 mb-4">
                                <CartImg/>
                            </div>
                            <p className="font-semibold">Your cart feels so light.</p> Add something to your cart!!
                        </div>}
                    </div>
                </div>
                </>
            )}
        </>
    );
};

export default Cart;


const CartProduct = ({ product }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(product.quantity);

    const deleteItemFromCartHandler = () => {
        dispatch(deleteItemFromCartAsync({ product: product.product }));
    };
    const setQuantityHandler = (condition) => {
        setQuantity((prev) => {
            const updatedQuantity = (condition === "plus")? prev+1:prev-1
            dispatch(updateProductQuantityAsync({product : product.product , quantity :updatedQuantity}))
            return updatedQuantity
        });
    }
    
    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-3">
            <div className="flex w-3/5">
                <div className="w-20">
                    <img className="h-20 w-full rounded" src={product.image || ''} alt="" />
                </div>
                <div className="flex flex-col items-start gap-4 ml-4 flex-grow ">
                    <span className="font-bold text-sm">{product.name}</span>
                    <button
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                        onClick={deleteItemFromCartHandler}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="flex justify-center text-xs sm:text-base items-center w-1/5">
                <div
                    onClick={() => {setQuantityHandler("plus")
                                            }}
                    className="cursor-pointer"
                >
                    <Plus />
                </div>
                <input
                    className="border text-center w-10 m-1"
                    type="text"
                    value={quantity}
                />
                <div
                    onClick={() => {quantity > 1 && setQuantityHandler("minus")
                    }}
                    className="cursor-pointer"
                >
                    <Minus />
                </div>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">
                ₹{product.price}
            </span>
        </div>
    );
};


