import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "./Design/Navbar";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);

  const router = useRouter();

  async function signup() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/signup`,
        {
          username: username,
          email: email,
          password: password,
        }
      );

      console.log(response);
      console.log(response.data);

      if (response.status === 200) {
        router.push("/login");
      } else {
        setInvalidCredentials(true);
      }
    } catch (error) {
      console.log("Error: ", error);
      setInvalidCredentials(true);
    }
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="bg-customDark3">
        <div className="min-h-screen text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 h-[900px]">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
              <div></div>
              <br />
              <br />
              <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">Signup</h1>
                <div className="w-full flex-1 mt-8">
                  <div className="mx-auto max-w-xs">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="text"
                      placeholder="UserName"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      onClick={() => signup()}
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign Up</span>
                    </button>

                    {invalidCredentials ? (
                      <div>
                        <p className="text-lg text-red-500 font-bold mx-[80px] my-4">
                          Invalid Credentials
                        </p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      <a
                        href="#"
                        className="border-b border-gray-500 border-dotted"
                      >
                        Terms of Service
                      </a>
                      and its
                      <a
                        href="#"
                        className="border-b border-gray-500 border-dotted"
                      >
                        Privacy Policy
                      </a>
                    </p>

                    <div className="my-[50px] mx-10">
                      <Image
                        src={
                          "https://www.tailwindtap.com/assets/components/form/createaccount/login.svg"
                        }
                        width={200}
                        height={200}
                        alt="Image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-indigo-700 text-center hidden lg:flex">
              <div
                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat h-[800px]"
                style={{
                  backgroundImage: "url('https://i.redd.it/ytciain2u0m21.jpg')",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
