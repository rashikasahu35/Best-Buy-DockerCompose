import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Transition, Menu } from "@headlessui/react";
import { IoClose as CloseIcon } from "react-icons/io5";
import { FaMinus as MinusIcon, FaPlus as PlusIcon } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import { FaChevronDown as DownIcon } from "react-icons/fa";
import { IoFunnel as FunnelIcon } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import { getProductListAsync } from "../redux/Product/ProductSlice";


const ProductList = () => {
    const dispatch = useDispatch();
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [page, setPage] = useState(1);
    const { loading, products, productCount } = useSelector(
        (state) => state.product.productList
    );
    const [queryCondition, setQueryCondition] = useState({
        category: [],
        minPrice: 0,
        maxPrice: 20000,
        sortBy: null,
        order: null,
    });

    useEffect(() => {
        dispatch(
            getProductListAsync({
                page,
                minPrice: queryCondition.minPrice,
                maxPrice: queryCondition.maxPrice,
                category: queryCondition.category,
                sortBy: queryCondition.sortBy,
                order: queryCondition.order,
            })
        );
    }, [dispatch, page, queryCondition]);

    return (
        <>
            <NavBar />
            <div className="bg-white">
                {loading && <Spinner />}
                
                {products && (
                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                            <h1 className=" text-xl md:text-4xl font-bold tracking-tight text-gray-900">
                                All Products
                            </h1>

                            {/* Sort */}
                            <div className="flex items-center">
                                <ProductSort
                                    queryCondition={queryCondition}
                                    setQueryCondition={setQueryCondition}
                                    setPage={setPage}
                                />
                                <button
                                    type="button"
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="sr-only">Filters</span>
                                    <FunnelIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>

                        <section
                            aria-labelledby="products-heading"
                            className="pt-6"
                        >
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                <ProductFilter
                                    mobileFiltersOpen={mobileFiltersOpen}
                                    setMobileFiltersOpen={setMobileFiltersOpen}
                                    queryCondition={queryCondition}
                                    setQueryCondition={setQueryCondition}
                                    setPage={setPage}
                                />

                                {/* Product grid & Pagination */}
                                <div className="lg:col-span-3 ">
                                    {/* no product remark */}
                                    {productCount == 0 && (
                                        <p className="w-full text-3xl text-indigo-600 text-center">
                                            Sorry, no product found!
                                        </p>
                                    )}
                                    <div className="mt-4 mb-8 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3 xl:gap-x-8 text-center">
                                        {products?.map((product, index) => (
                                            <ProductCard
                                                product={product}
                                                key={index}
                                            />
                                        ))}
                                    </div>
                                    <Pagination
                                        page={page}
                                        setPage={setPage}
                                        productCount={productCount}
                                    />
                                </div>
                            </div>
                        </section>
                    </main>
                )}
            </div>
        </>
    );
};
export default ProductList;

const ProductFilter = ({
    mobileFiltersOpen,
    setMobileFiltersOpen,
    queryCondition,
    setQueryCondition,
    setPage,
}) => {
    
    const filters = [
        {
            id: "category",
            name: "Category",
            options: [
                {
                    value: "Travel",
                    label: "Travel",
                    checked: queryCondition.category.includes("Travel")
                        ? true
                        : false,
                },
                {
                    value: "Watch",
                    label: "Watch",
                    checked: queryCondition.category.includes("Watch")
                        ? true
                        : false,
                },
                {
                    value: "Laptop",
                    label: "Laptop",
                    checked: queryCondition.category.includes("Laptop")
                        ? true
                        : false,
                },
                {
                    value: "SmartPhones",
                    label: "SmartPhones",
                    checked: queryCondition.category.includes("SmartPhones")
                        ? true
                        : false,
                },
                {
                    value: "UpperWear",
                    label: "UpperWear",
                    checked: queryCondition.category.includes("UpperWear")
                        ? true
                        : false,
                },
                {
                    value: "Jacket",
                    label: "Jacket",
                    checked: queryCondition.category.includes("Jacket")
                        ? true
                        : false,
                },
                {
                    value: "BottomWear",
                    label: "BottomWear",
                    checked: queryCondition.category.includes("BottomWear")
                        ? true
                        : false,
                },
            ],
        },
    ];
    const [price, setPrice] = useState([0, 100000]);

    const setFilterOption = (categoryValue) => {
        const exist = queryCondition.category.includes(categoryValue);
        setPage(1);
        if (exist) {
            setQueryCondition((prevState) => ({
                ...prevState,
                category: prevState.category.filter((c) => c !== categoryValue),
            }));
        } else {
            setQueryCondition((prevState) => ({
                ...prevState,
                category: [...prevState.category, categoryValue],
            }));
        }
    };

    const handlePriceChange = (event, newValue) => {
        setPage(1);
        setPrice(newValue);
        setQueryCondition((prevState) => ({
            ...prevState,
            minPrice: newValue[0],
            maxPrice: newValue[1],
        }));
    };

    return (
        <>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-40 lg:hidden"
                    onClose={setMobileFiltersOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Filters
                                    </h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() =>
                                            setMobileFiltersOpen(false)
                                        }
                                    >
                                        <span className="sr-only">
                                            Close menu
                                        </span>
                                        <CloseIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4 border-t border-gray-200">
                                    {filters.map((section) => (
                                        <Disclosure
                                            as="div"
                                            key={section.id}
                                            className="border-t border-gray-200 px-4 py-6"
                                        >
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">
                                                                {section.name}
                                                            </span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <PlusIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {section.options.map(
                                                                (
                                                                    option,
                                                                    optionIdx
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            option.value
                                                                        }
                                                                        className="flex items-center"
                                                                        onClick={() =>
                                                                            setFilterOption(
                                                                                option.value
                                                                            )
                                                                        }
                                                                    >
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={
                                                                                option.value
                                                                            }
                                                                            type="checkbox"
                                                                            defaultChecked={
                                                                                option.checked
                                                                            }
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {
                                                                                option.label
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                    {/* mobile Price */}
                                    <div className="border-b border-gray-200 px-6 py-6">
                                        <p className="font-medium text-gray-900">
                                            Price
                                        </p>
                                        <Slider
                                            value={price}
                                            onChange={handlePriceChange}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="price-range-slider"
                                            min={0}
                                            max={100000}
                                            step={5000}
                                        />
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Desktop filter dailog */}
            <form className="hidden lg:block">
                {/* ------- sidebar filters------ */}
                <h3 className="sr-only">Categories</h3>
                {filters.map((section) => (
                    <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-gray-200 py-6"
                    >
                        {({ open }) => (
                            <>
                                <h3 className="-my-3 flow-root">
                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                        <p className="font-medium text-gray-900">
                                            {section.name}
                                        </p>
                                        <span className="ml-6 flex items-center">
                                            {open ? (
                                                <MinusIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <PlusIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </span>
                                    </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                    <div className="space-y-4">
                                        {section.options.map(
                                            (option, optionIdx) => (
                                                <div
                                                    key={option.value}
                                                    className="flex items-center"
                                                    onClick={() =>
                                                        setFilterOption(
                                                            option.value
                                                        )
                                                    }
                                                >
                                                    <input
                                                        id={`filter-${section.id}-${optionIdx}`}
                                                        name={`${section.id}[]`}
                                                        type="checkbox"
                                                        defaultValue={
                                                            option.value
                                                        }
                                                        defaultChecked={
                                                            option.checked
                                                        }
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label
                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                        className="ml-3 text-sm text-gray-600"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                ))}
                {/* Dektop Price */}
                <div className="border-b border-gray-200 py-6 ">
                    <p className="font-medium text-gray-900">Price</p>
                    <Slider
                        value={price}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="price-range-slider"
                        min={0}
                        max={100000}
                        step={5000}
                    />
                </div>
            </form>
        </>
    );
};

const ProductSort = ({ queryCondition, setQueryCondition, setPage }) => {
    const sortOptions = [
        { name: "Best Ratings", sort: "ratings", order: -1, current: false },
        { name: "Price: Low to High", sort: "price", order: 1, current: false },
        {
            name: "Price: High to Low",
            sort: "price",
            order: -1,
            current: false,
        },
    ];

    const setSortOption = (sort, order) => {
        setPage(1);
        setQueryCondition((prevState) => ({
            ...prevState,
            sortBy: sort,
            order: order,
        }));
    };

    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <DownIcon
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {sortOptions.map((option) => (
                                <Menu.Item key={option.name}>
                                    {({ active }) => (
                                        <div
                                            onClick={() =>
                                                setSortOption(
                                                    option.sort,
                                                    option.order
                                                )
                                            }
                                            className={classNames(
                                                option.current
                                                    ? "font-medium text-gray-900"
                                                    : "text-gray-500",
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm"
                                            )}
                                        >
                                            {option.name}
                                        </div>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
