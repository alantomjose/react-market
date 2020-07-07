import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

export default function Checkout() {
    const [name, setName] = useState("");
  const { total } = useContext(CartContext);
  return (
    <div>
      <div className="h-full py-65   mx-4 md:mx-16 lg:mx-32">
        <div className="mx-2 text-center py-10 flex flex-col items-center justify-center  ">
          <span className="text-4xl  text-gray-800 block pb-8">Address</span>

          <form className="px-4 sm:px-20 w-full">
            <div className="md:flex md:items-center mb-6  ">
              <div className="md:w-1/3">
                <label
                  className=" sm:text-xl block text-gray-800  md:ml-32 mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 
                    rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                    focus:bg-white focus:border-purple-500"
                  id="inline-full-Item"
                  type="text"
                  name="name"
                  value={name}
                  onChange={e=>setName(e.target.value)}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className=" sm:text-xl block text-gray-800  md:ml-32 mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Dscription
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 
                    rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                    focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  name="desc"
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className=" sm:text-xl block text-gray-800  md:ml-32 mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Pin
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 
                    rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                    focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="number"
                  name="price"
                />
              </div>
            </div>
          </form>

          <div class="flex flex-col bg-white px-8 py-6 max-w-sm mx-auto rounded-lg shadow-lg my-10 w-6/12">
            <div class="flex justify-center items-center">
              <a class="text-2xl font-bold uppaecase">Total: Rs.{total}</a>
            </div>
            <div class="mt-4">
              <Link  className="px-3 py-2 bg-black text-lg text-green-100 rounded cursor-pointer">
                Pay & Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
