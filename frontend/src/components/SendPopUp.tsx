import React from "react";

const SendPopUp = ({ onClose }: any) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-customDark2 w-[600px] h-[700px] p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-center">
          <p className="text-white font-semibold text-3xl">Send</p>
        </div>

        <br />

        <div>
          <p className="text-white font-bold text-2xl mx-4">From</p>
          <div className="bg-customDark2 w-[550px] h-[80px] mx-[5px] my-4 border border-white rounded-lg p-4">
            <p className="text-white font-semibold text-lg">Your Account</p>
            <p className="text-white text-lg font-serif">
              {/* Show the public key of the User */}
            </p>
          </div>
        </div>
        <br />
        <br />

        <div>
          <p className="text-white font-bold text-2xl mx-4">To</p>
          <input
            type="text"
            className="rounded-lg bg-customDark2 w-[550px] h-[75px] border border-white mx-[5px] my-4 px-5 text-2xl text-white"
            placeholder="Enter Public Address"
          />
          <input
            type="text"
            className="rounded-lg bg-customDark2 w-[550px] h-[75px] border border-white mx-[5px] my-4 px-5 text-2xl text-white"
            placeholder="Value of ETH to send"
          />
        </div>

        <br />

        <br />

        <div className="flex justify-center mt-8 space-x-8">
          <button
            className="border-2 rounded-3xl px-8 py-3 text-cyan-600 font-semibold text-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            className="border-2 rounded-3xl px-8 py-3 bg-cyan-600 text-white font-semibold text-lg hover:bg-cyan-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendPopUp;
