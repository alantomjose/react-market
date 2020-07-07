import React, { useState, useContext } from "react";
import { auth, firestore } from "../firebase";
import { UserContext } from "../Context/UserContext";

export default function Signup() {
  const [Seller, setSeller] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [err, setErr] = useState("");

  const { isLoggedIn, setIsLoggedIn, isSeller, setIsSeller } = useContext(
    UserContext
  );

  const signUp = () => {
    if (email && name && password && confPassword) {
      if (password !== confPassword) {
        setErr("Confirm Password does not match");
      } else {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
            console.log(user.user.uid);
            let myuser = { email, name, address, company,isSeller:Seller?true:false };
            firestore
              .collection("users")
              .doc(user.user.uid)
              .set(myuser)
              .then(() => {
                setErr("User Created");
              })
              .catch((err) => {
                console.log(err);
                setErr("Something went wrong");
              });
          })
          .catch(function (error) {
            alert("Some Error Occured");
          });
      }
    } else {
      setErr("Empty fields");
    }
  };

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
                <div className="w-full lg:w-8/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                    <div className="text-4xl py-5 uppercase text-grey-600 font-bold">
                      SignUp
                    </div>
                    <div
                      className=" mx-auto py-2 px-3 fony-bold text-white w-5/12 bg-gray-900 rounded uppercase cursor-pointer"
                      onClick={() => setSeller(!Seller)}
                    >
                      Sign up as{" "}
                      {Seller ? <span>Cusotmer</span> : <span>Seller</span>}
                    </div>
                    <div className="text-xl py-5 uppercase text-grey-600 font-bold">
                      Im a{" "}
                      {Seller ? <span>Seller</span> : <span>Customer</span>}{" "}
                    </div>
                    <div className="flex-auto px-4 lg:px-5 py-10 pt-2">
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
                            Name
                          </label>
                          <input
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            type="text"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="Name"
                            style={{ transition: "all .15s ease" }}
                          />
                        </div>
                        {Seller ? (
                          <div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Company
                              </label>
                              <input
                                value={company}
                                onChange={(e) => {
                                  setCompany(e.target.value);
                                }}
                                type="text"
                                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                                placeholder="Company"
                                style={{ transition: "all .15s ease" }}
                              />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Address
                              </label>
                              <input
                                value={address}
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                }}
                                type="text"
                                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                                placeholder="Address"
                                style={{ transition: "all .15s ease" }}
                              />
                            </div>
                          </div>
                        ) : null}

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
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Confirm Password
                          </label>
                          <input
                            value={confPassword}
                            onChange={(e) => {
                              setConfPassword(e.target.value);
                            }}
                            type="password"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="Password"
                            style={{ transition: "all .15s ease" }}
                          />
                        </div>

                        <div className="text-center mt-6">
                          <button
                            onClick={signUp}
                            className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            Sign In
                          </button>
                        </div>
                        <div className="text-xl py-5 uppercase text-grey-600 font-bold">
                          {err}
                        </div>
                      </form>
                    </div>
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
