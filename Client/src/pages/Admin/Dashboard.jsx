import React, { useEffect, useReducer, useState } from "react";
import SideBar from "./components/Sidebar";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import {getAllOrdersAsync} from '../../redux/Order/OrderSlice'
import {getAllUsersAsync} from '../../redux/User/UserSlice'
import {getAllProductsAsync} from '../../redux/Product/ProductSlice'
import Spinner from "../../components/Spinner";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from "chart.js";
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
);


const Dashboard = () => {
    const dispatch = useDispatch()
    const { loading : getAllProductsLoading, productCount, products } = useSelector(
        (state) => state.product.productAll
    );
    const { loading : getAllOrdersLoading, totalAmount, orderCount } = useSelector(
        (state) => state.order.getAllOrders
    );
    const { loading : getAllUsersLoading, userCount, users } = useSelector(
        (state) => state.user.getAllUsers
    );
    const [roleCount, setRoleCount] = useState({user : 0, admin : 0})   // admin, user
    const [productStockCount, setProductStockCount] = useState({inStock : 0, outOfStock : 0})  // product in stock, out of stock

    const userRole = {
        labels: ["User", "Admin"],
        datasets: [
            {
                data: [roleCount.user, roleCount.admin],
                backgroundColor: ["#f4a261", "#2a9d8f"],
                hoverBackgroundColor: ["#f4a261", "#2a9d8f"],
            },
        ],
    };
    const productStock = {
        labels: ["In Stock", "Out of Stock"],
        datasets: [
            {
                data: [productStockCount.inStock, productStockCount.outOfStock],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
            },
        ],
    };
    const revenue = {
        labels: ["Intial Amount", "Current Amount"],
        datasets: [
            {
                label: "Revenue",
                data: [0, totalAmount],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',    
                      
                fill: true,
            },
        ],
    };


    useEffect(() => {
        dispatch(getAllUsersAsync())
        dispatch(getAllProductsAsync())
        dispatch(getAllOrdersAsync())
    }, [dispatch])

    useEffect(() => {
        if(users){
            setRoleCount({
                user : users.reduce((count, user) => (user.role === "user")? count+=1:count , 0),
                admin : users.reduce((count, user) => (user.role === "admin")? count+=1:count , 0)
            })
        }
        if(products){
            setProductStockCount({
                inStock : products.reduce((count, product) => (product.noOfStock>0)? count+=1:count , 0),
                outOfStock : products.reduce((count, product) => (product.noOfStock===0)? count+=1:count , 0)
            })
        }
    }, [users, products])



    return (
        <>
            {(getAllOrdersLoading || getAllProductsLoading || getAllUsersLoading) && <Spinner/>}
            {(!getAllOrdersLoading && !getAllProductsLoading && !getAllUsersLoading) && 
            <div className="h-fit bg-gray-200 overflow-y-auto">
                <div className="mt-[60px] text-gray-900 flex flex-wrap gap-x-3 ">
                    <SideBar />
                    <div className="h-full py-4 sm:ml-60 w-full flex flex-col gap-y-3 overflow-y-auto">
                        <div className="flex flex-wrap gap-3 md:gap-8 justify-center w-full">
                            <Card title={"Total Revenue"} data={totalAmount} />
                            <Card title={"Users"} data={userCount} />
                            <Card title={"Products"} data={productCount} />
                            <Card title={"Orders"} data={orderCount} />
                        </div>
                        <div className="w-full flex items-center justify-around">
                            <div className="lg:h-96 lg:w-[700px] sm:h-60 sm:w-[400px] h-44 w-[300px]">
                                <Line data={revenue}/>
                            </div>
                        </div>
                        <div className="w-full flex flex-wrap justify-around text-lg text-gray-900 font-bold">
                            <div className=" md:h-60 md:w-60 h-44 w-44 flex flex-col gap-y-2 text-center">
                                <p>Users</p>
                                <Doughnut data={userRole} />
                            </div>
                            <div className=" md:h-60 md:w-60  h-44 w-44  flex flex-col gap-y-2 text-center">
                                <p>Products</p>
                                <Doughnut data={productStock} />
                            </div>
                        </div>
                        
                        
                        
                    </div>
                </div>
            </div>}
        </>
    );
};
export default Dashboard;

const Card = ({ title, data }) => {
    return (
        <div className="flex flex-col items-center justify-center md:w-40 w-32 py-6 px-4 shadow-lg  bg-white text-center text-base md:text-2xl font-bold rounded-full">
            <div className=" text-slate-500">{title} </div>
            <div className="text-slate-900 ">{data} </div>
        </div>
    );
};
