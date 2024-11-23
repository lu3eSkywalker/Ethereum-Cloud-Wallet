import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  async function logout() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if(response.status === 200) {
        router.push('login');
      }
      console.log(response);
    } catch (error: unknown) {
      console.log(error);
    }
  }

  return (
    <nav className="bg-customDark3">
      <div className="relative flex h-[130px] items-center justify-between px-6">
        <div className="flex items-center">
          <button onClick={() => router.push("/ethcloudwallet")}>
            <p className="text-3xl font-bold text-green-500 tracking-wide hover:text-indigo-400 transition duration-300 ease-in-out">
              ETH Wallet
            </p>
          </button>
        </div>

        <div className="flex space-x-4 ml-auto">
          {currentPath === "/signup" ? (
            <div>
              <button
                className="text-white text-xl mx-10 hover:text-blue-500"
                onClick={() => router.push("/ethcloudwallet")}
              >
                About
              </button>
              <button
                className="rounded-3xl mx-10 text-green-400 px-8 py-2 font-medium text-xl hover:text-black hover:bg-green-400 border-green-400 border-2"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            </div>
          ) : (
            <p></p>
          )}

          {currentPath === "/login" ? (
            <div>
              <button
                className="text-white text-xl mx-10 hover:text-blue-500"
                onClick={() => router.push("/ethcloudwallet")}
              >
                About
              </button>

              <button
                className="rounded-3xl bg-green-400 px-8 py-2 font-medium text-black hover:bg-blue-600 text-xl hover:text-white"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <p></p>
          )}

          {currentPath === "/ethcloudwallet" ? (
            <div>
              <button
                className="text-white text-xl mx-10 hover:text-blue-500"
                onClick={() => router.push("/ethcloudwallet")}
              >
                About
              </button>
              <button
                className="rounded-3xl mx-10 text-green-400 px-8 py-2 font-medium text-xl hover:text-black hover:bg-green-400 border-green-400 border-2"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className="rounded-3xl bg-green-400 px-8 py-2 font-medium text-black hover:bg-blue-600 text-xl hover:text-white"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <p></p>
          )}

          {currentPath === "/wallet" ? (
            <div>
              <button
                className="text-white text-xl mx-10 hover:text-blue-500"
                onClick={() => router.push("/ethcloudwallet")}
              >
                About
              </button>
              <button
                className="rounded-3xl bg-green-400 px-8 py-2 font-medium text-black hover:bg-blue-600 text-xl hover:text-white"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
