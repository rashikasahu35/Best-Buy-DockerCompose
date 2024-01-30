import React from 'react'
import {
    FaChevronLeft as LeftIcon,
    FaAngleRight as RightIcon
}  from "react-icons/fa";


const Pagination = ({page, setPage, productCount}) => {
    
  return (
    <div className="w-full flex justify-center mb-6">
                <div
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                >
                    {page>1 && <div 
                        className="relative inline-flex items-center gap-1 rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer" 
                        onClick={() => setPage((prev) => prev-1)}>
                        
                        <LeftIcon className="h-5 w-5" aria-hidden="true" />
                        <p className=''>Previous</p>
                    </div>}
                    {page>1 && <div
                        className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Page {page}
                    </div>}
                    {(productCount-(page*8))>0 && <div 
                        className="relative inline-flex items-center gap-1 rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        onClick={() => setPage((prev) => prev+1)}>
                        <p className=''>Next</p>
                        <RightIcon className="h-5 w-5" aria-hidden="true" />
                    </div>}
                </div>
            </div>
  )
}

export default Pagination