import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { auth, firestore, storage } from "../firebase";
// import spinner from "../assets/spinner3.gif";

export default function Order() {
  const theform = {
    name: "",
    price: "",
    desc: "",
  };

  const [values, setValues] = useState(theform);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({ image: null, url: "" });

  const { isLoggedIn, isSeller, id } = useContext(UserContext);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const addOrder = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setLoading(true);
    let prod = {
      name: values.name,
      desc: values.desc,
      price: values.price,
      c_id: id,
      img_id:image.url
    };
    console.log(prod);
    firestore
      .collection("products")
      .add(prod)
      .then(function (doc) {
        console.log("Document successfully written!");
        setLoading(false);
        setValues(theform);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const handleImage = (e) => {
    setImage({ image: e.target.files[0], url: "" });
  };

  const imageUpload=(e)=>{
    //   console.log(image.image)
      e.preventDefault();
      setLoading(true);
    const uploadTask = storage.ref(`$images/${image.name}${id}${values.name}${values.desc}`).put(image.image);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function (error) {
        console.log(error);
      },
      function () {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(function (downloadURL) {
            console.log("File available at", downloadURL);
            setImage({...image,url:downloadURL})
            setLoading(false);
          });
      }
    );
    
  }

  return (
    <div className="appbody h-screen pt-10 w-screen">
      {isSeller ? (
        <div className="h-full py-65   mx-4 md:mx-16 lg:mx-32">
          <div className="mx-2 text-center py-10 flex flex-col items-center justify-center  ">
            <span className="text-4xl  text-gray-800 block pb-8">
              Add New Product
            </span>

            <form className="px-4 sm:px-20 w-full">
              <div className="md:flex md:items-center mb-6  ">
                <div className="md:w-1/3">
                  <label
                    className=" sm:text-xl block text-gray-800  md:ml-32 mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
                    Product Name
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
                    onChange={handleInput}
                    value={values.name}
                  />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className=" sm:text-xl block text-gray-800  md:ml-32 mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
                    Price
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
                    value={values.price}
                    onChange={handleInput}
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
                    value={values.desc}
                    onChange={handleInput}
                  />
                </div>
              </div>
              {/* <input type="file" className="py-2 px-6 m-2 = bg-gray-600 text-white ">
              Order
            </input> */}
              <input type="file" onChange={handleImage} />
              <button onClick={imageUpload} className="py-2 px-6 m-2 = bg-gray-600 text-white ">
                Upload Image
              </button>

              <button className="py-2 px-6 m-2 = bg-gray-600 text-white" onClick={addOrder}>
                Order
              </button>
            </form>
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
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        New Product Added
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          {/* //loading */}
          {loading ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                // onClick={() => setShowModal(false)}
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}

                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <img src="url(a)" alt="loading" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      ) : (
        <div className="">
          <h1 className="text-4xl  text-gray-800 block py-32">
            Sorry you are not a Seller
          </h1>
          <Link
            to="/"
            className="py-2 px-6 my-20  bg-gray-800 text-white shadow-lg text-2xl"
          >
            Return Home
          </Link>
        </div>
      )}
    </div>
  );
}
