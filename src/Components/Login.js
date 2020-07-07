import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { auth, firestore } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("seller@test.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("asdad");
  const { isLoggedIn, setIsLoggedIn ,isSeller,setIsSeller,id, setId} = useContext(UserContext);


  const userLogin = () => {
    console.log("click");
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setIsLoggedIn(true);
        setError("");
        console.log(user)
        auth.onAuthStateChanged(function(user) {
          if (user) {
            console.log(user.uid)
            firestore.collection("users").doc(user.uid).get().then(doc=>{
              let myuser = doc.data();
              
              setIsSeller(myuser.isSeller)
              setId(user.uid);

            })
          } 
        });
        
      })
      .catch(function (err) {
        console.log("nor Logged in ,Error:", err.message, err.code);
        setError("Cannot Find User or");
      });
  };

  const logout=()=>{
    console.log("signing out")
    auth.signOut().then(function() {
      setIsLoggedIn(false);

    }).catch(function(err) {
      console.log(err.code,err.message)
    });

  }


  return (
    <div>
      <>
        <main>
          <section className="absolute w-full h-full">
            <div
              className="absolute top-0 w-full h-full bg-gray-900"
              // style={{
              //   backgroundImage:
              //     "url(" + require("assets/img/register_bg_2.png") + ")",
              //   backgroundSize: "100%",
              //   backgroundRepeat: "no-repeat"
              // }}
            ></div>
            <div className="container mx-auto px-4 h-full">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-7/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                    {!isLoggedIn?(
                      <div>
                      <div className="text-4xl py-5 uppercase text-grey-600 font-bold">
                      LogIn
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-10">
                      <form>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            type="email"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="Email"
                            style={{ transition: "all .15s ease" }}
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Password
                          </label>
                          <input
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            type="password"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="Password"
                            style={{ transition: "all .15s ease" }}
                          />
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                          />
                        </label>

                        <div className="text-center mt-6">
                          <button
                            onClick={userLogin}
                            className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            Sign In
                          </button>
                        </div>
                        <div className="text-xl py-5 uppercase text-grey-600 font-bold">
                          {error}
                        </div>
                      </form>
                    </div> 
                      </div>
                    ):(
                      <div className="text-center mt-6">
                      <div className="text-xl py-5 uppercase text-grey-600 font-bold">
                      Already Logged In
                    </div>
                          <button
                            onClick={logout}
                            className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 my-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 "
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            Logout
                          </button>
                        </div>
                      
                    )}
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    </div>
  );
}
