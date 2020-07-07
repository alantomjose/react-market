import React from 'react'
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="h-full mt-20 md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          
          {/* Brand */}
          <Link
            className="md:block text-center md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-xl uppercase font-bold p-4 px-0"
            to="/"
          >
            Dashboard
          </Link>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
           
            
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              

              <li className="items-center">
                <Link
                  className="text-gray-800 hover:text-gray-600  uppercase py-3 font-bold block"
                  to="/dashboard/addprod"
                >
                   New Product
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="text-gray-800 hover:text-gray-600  uppercase py-3 font-bold block"
                  to="/"
                >
                  View Orders
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="text-gray-800 hover:text-gray-600  uppercase py-3 font-bold block"
                  to="/"
                >
                  List Products
                </Link>
              </li>


             
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            
          </div>
        </div>
      </nav>
    </>
  ); 
}
