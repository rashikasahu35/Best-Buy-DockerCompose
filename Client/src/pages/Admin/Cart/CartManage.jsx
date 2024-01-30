import React, { useEffect } from "react";
import SideBar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { getCartAsync , deleteCartAsync, CLEAR_DELETE_CART} from "../../../redux/Cart/CartSlice";

const CartManage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading, cart, noOfItems } = useSelector(
        (state) => state.cart.getCart
    );
    const { success : deleteCartSuccess } = useSelector(
        (state) => state.cart.deleteCart
    );

    useEffect(() => {
        dispatch(getCartAsync(id));
    }, []);

    useEffect(() => {
        if(deleteCartSuccess){
            dispatch(CLEAR_DELETE_CART())
            navigate("/admin/cart");
        }
    }, [deleteCartSuccess]);

    const deleteHandler = async (e) => {
      e.preventDefault()
      dispatch(deleteCartAsync(id))
    }

    return (
        <>
            {loading && <Spinner />}
            {!loading && (
                <div className="min-h-screen bg-white">
                    <div className="mt-[60px] text-gray-900 flex flex-wrap gap-x-1">
                        <SideBar />
                        <div className="w-full p-4 sm:ml-60 mt-10 sm:mt-0 flex flex-col gap-y-2">
                            {/* if cart has items */}
                            {noOfItems > 0 && (
                                <div className="w-full flex flex-col gap-y-2 ">
                                    <form
                                        className="w-full flex justify-center p-4"
                                    >
                                        <div className="w-fit flex flex-col justify-center gap-y-4 bg-gray-200 rounded-lg p-4">
                                            <div className="font-bold text-lg sm:text-xl md:text-2xl text-center">
                                                Delete Cart
                                            </div>
                                            <button className="flex justify-center rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 cursor-pointer disabled:cursor-not-allowed" onClick={deleteHandler}>
                                                Delete
                                            </button>
                                        </div>
                                    </form>
                                    <div className="p-4  shadow-xl bg-gray-50">
                                        <div className="flex justify-between border-b pb-4 font-semibold text-xl md:text-2xl">
                                            <h2>No. Of Items</h2>
                                            <h2>
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
                                            {cart?.products?.map(
                                                (product, index) => (
                                                    <CartProduct
                                                        product={product}
                                                        key={index}
                                                    />
                                                )
                                            )}
                                        </div>

                                        {/* subTotal */}
                                        <div className="w-full px-4 pt-4 flex justify-between font-semibold text-xl">
                                            <div>SubTotal</div>
                                            <div className="pr-0 md:pr-6 lg:pr-10 xl:pr-16">
                                                ₹{cart?.subTotal}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* if no items in cart */}
                            {noOfItems == 0 && (
                                <div className="text-indigo-600 text-2xl text-center p-4">
                                    <p className="font-semibold">
                                        No Items in Cart
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartManage;

const CartProduct = ({ product }) => {
    return (
        <div className="flex items-center hover:bg-gray-100 px-2 sm:px-6 py-3">
            <div className="flex w-3/5">
                <div className="w-20">
                    <img
                        className="h-20 w-full rounded"
                        src={product.image || ""}
                        alt=""
                    />
                    <span className="font-bold text-sm">{product.name}</span>
                </div>
            </div>
            <div className="flex justify-center text-xs sm:text-base items-center w-1/5">
                <input
                    className="border text-center w-10 m-1"
                    type="text"
                    value={product.quantity}
                />
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">
                ₹{product.price}
            </span>
        </div>
    );
};
