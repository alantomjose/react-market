import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";

export default function Checkout() {
  const [name, setName] = useState("");
  const { total } = useContext(CartContext);
  const {cart, setCart} = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);



  const chekout=()=>{
      setShowModal(true);
      setLoading(true);
      cart.forEach(p => {
          firestore.collection("orders").add({...p,b_name:name})
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            setLoading(false);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            setLoading(false);
        });
      });
}

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
                  onChange={(e) => setName(e.target.value)}
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
              <div  onClick={chekout} className="px-3 py-2 bg-black text-lg text-green-100 rounded cursor-pointer">
                Pay & Place Order
              </div>
            </div>
          </div>
        </div>
        {showModal ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    {loading? (
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Loading...
                      </h3>
                    </div>
                    ):(
                        <div>

                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Order Placed
                      </h3>
                    </div>

                        <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                      <Link to="/"
                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        
                      >
                        Home
                      </Link>
                    </div>
                        </div>
                    )}
                    
                    {/*footer*/}
                    
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
      </div>
    </div>
  );
}
