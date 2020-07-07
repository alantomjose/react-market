import React, { useState, useEffect, useContext } from "react";
import { firestore } from "../firebase";
import { CartContext } from "../Context/CartContext";

export default function ProductList() {
  const [prods, setProds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProd, setSelectedProd] = useState();
  const [selectedNum, setSelectedNum] = useState(0);

  const {cart, setCart} = useContext(CartContext);

  useEffect(() => {
    let prodlist = [];
    firestore
      .collection("products")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          //   console.log(doc.id, " => ", doc.data());
          let p = doc.data();
          console.log(p);
          prodlist.push(p);
        });
        setProds(prodlist);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, []);

  const addtoModal = (prod) => {
    setShowModal(true);
    setSelectedProd(prod);
  };

  const addToCart=()=>{
    setCart([...cart,selectedProd]);
    setShowModal(false);
    setSelectedNum(0);
    setSelectedProd(null);
  }

  const handleNumber=(e)=>{
    setSelectedNum(e.target.value);
  }
    useEffect(() => {
      let prod=selectedProd;
      prod={...prod,num:parseInt(selectedNum)}
      setSelectedProd(prod);
      // console.log(prod) 
    }, [selectedNum])

  return (
    <div>
      <div className="flex flex-wrap">
        {prods.map((prod, key) => (
          <div className=" w-64 bg-white mx-20 my-5 shadow-lg " key={key}>
            <div>
              <img src={prod.img_id} alt="montaña" />
            </div>
            <div class="p-3 space-y-3">
              <h3 class="text-gray-700 font-semibold text-md">{prod.name}</h3>
              <p class="text-sm text-gray-900 leading-sm">{prod.desc}</p>
              <p className="text-black text-xl font-bold uppercase">
                Price: Rs.{prod.price}
              </p>
            </div>
            <button
              onClick={() => {
                addtoModal(prod);
              }}
              class="bg-black uppercase w-full flex justify-center py-2 text-white font-semibold transition duration-300 hover:bg-gray-500"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
      {/* MODAL */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Add to Cart</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div class="p-3 space-y-3">

                <div className="px-10 py-5">
                  <div>
                    <img src={selectedProd.img_id} alt="montaña" />
                  </div>
                  <h3 class="text-gray-900 font-semibold text-2xl">
                    Name: {selectedProd.name}
                  </h3>
                  <p class="text-lg text-gray-900 leading-sm">
                    Description {selectedProd.desc}
                  </p>
                  <p className="text-black text-xl font-bold uppercase">
                    Price: Rs.{selectedProd.price}
                  </p>
                  <label >Number: </label>
                  <input type="number" className="bg-gray-200 p-2" value={selectedProd.num} onChange={e=>handleNumber(e)} />
                </div>
              </div>
              
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => addToCart()}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
