import React, { useContext,useState,useEffect } from 'react'
import { CartContext } from '../Context/CartContext'
import { Link } from 'react-router-dom';

export default function Cart() {
  // const [totPrice, setTotPrice] = useState(0);
  const [totNum, setTotNum] = useState(0);
  const {cart, setCart} = useContext(CartContext);
  const {total, setTotal} = useContext(CartContext);

  useEffect(() => {
    let num=0
    let price=0
    cart.forEach(p => {
      num+=p.num;
      price+=p.num*p.price
    });
    setTotal(price);
    setTotNum(num);
  }, )
  const deleteFromCart=(product)=>{
    let newCart= cart.filter(p=>p!=product);
    setCart(newCart);
  }

  
    return (
        <div>
        <div className="py-20 px-20">
        
            <h1 className="text-3xl font-bold">My Cart</h1>

            <table class="table-auto border-collapse w-full">
        <thead>
          <tr class=" text-md font-medium text-gray-700 text-left" >
            <th class="px-4 py-2 bg-gray-200 " >Item Name</th>
            <th class="px-4 py-2 bg-gray-200 " >Price</th>
            <th class="px-4 py-2 bg-gray-200 " >Num</th>
            <th class="px-4 py-2 bg-gray-200 " >Total</th>
            <th class="px-4 py-2 bg-gray-200 " >Delete</th>
          </tr>
        </thead>
        
        <tbody class="text-md text-left font-normal text-gray-700">
        {cart.map((ord,key)=>{
          {/* setTotNum(totNum+ord.num);
          setTotPrice(totPrice+ord.price*ord.num); */}
          return(
          <tr class="hover:bg-gray-100 border-b border-gray-200 py-10 " key={key}>
            <td class="px-4 py-4">{ord.name}</td>
            <td class="px-4 py-4">{ord.price}</td>
            <td class="px-4 py-4">{ord.num}</td>
            <td class="px-4 py-4">{ord.price*ord.num}</td>
            <td class="px-4 py-4 "> <span className="bg-black  rounded text-white p-2 cursor-pointer" onClick={()=>{deleteFromCart(ord)}}>Delete </span></td>
          </tr>
        )})}
          
        </tbody>
      </table>
      <div class="flex flex-col bg-white px-8 py-6 max-w-sm mx-auto rounded-lg shadow-lg my-10">
        <div class="flex justify-center items-center">
            <a class="text-2xl font-bold uppaecase" >Total: Rs.{total}</a>
        </div>
        <div class="mt-4">
            <Link to="/checkout" class="px-3 py-2 bg-black text-lg text-green-100 rounded cursor-pointer" >Checkout</Link>
        </div>
    </div>
      <div className="text-xl"> </div>

        </div>
        </div>
    )
}
