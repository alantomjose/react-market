import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from '../Context/CartContext';
import { firestore } from '../firebase';
import { UserContext } from '../Context/UserContext';

export default function ViewOrders() {
    const {id} = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        let neword=[]
        let data;
        console.log(neword.size);
        firestore.collection("orders").where("c_id", "==", id)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                let p = doc.data();
                console.log(p);
                neword.push(p);

            });
            setOrders(neword);
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        console.log(neword);
    }, [])
    return (
        <div className="ml-64 mr-20">
        <div className="py-20 px-20">
        
            <h1 className="text-3xl font-bold">My Cart</h1>

            <table class="table-auto border-collapse w-full">
        <thead>
          <tr class=" text-md font-medium text-gray-700 text-left" >
            <th class="px-4 py-2 bg-gray-200 " >Item Name</th>
            <th class="px-4 py-2 bg-gray-200 " >Buyer Name</th>
            <th class="px-4 py-2 bg-gray-200 " >Number</th>
            
          </tr>
        </thead>
        
        <tbody class="text-md text-left font-normal text-gray-700">
        

        {orders.map((ord,k)=>{
            console.log(ord)
          {/* setTotNum(totNum+ord.num);
          setTotPrice(totPrice+ord.price*ord.num); */}
          return(
          <tr class="hover:bg-gray-100 border-b border-gray-200 py-10 " >
            <td class="px-4 py-4">{ord.name}aaa</td>
            <td class="px-4 py-4">{ord.b_name}</td>
            <td class="px-4 py-4">{ord.num}</td>
            
          </tr>
        )})}
          
        </tbody>
      </table>
      
      <div className="text-xl"> </div>

        </div>
        </div>
    )
}
