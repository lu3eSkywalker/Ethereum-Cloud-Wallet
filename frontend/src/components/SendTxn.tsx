import React,from "react";
const SendTxn = () => {

  return (
    <div className="bg-customDark">
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-[1000px] h-[800px] bg-customDark2 rounded-lg shadow-lg p-6 space-y-6">
          {/* User Info */}

          <div className="flex">
            <div className="bg-black text-white font-medium text-xl rounded-full w-[120px] h-[40px] flex items-center justify-center">
              Sepolia
            </div>
            <div className="text-white mx-[270px] text-4xl my-2 font-semibold">
              Welcome!!
              <br />
            </div>
          </div>

          <div className="w-full border-t border-black shadow-[0_5px_15px_rgba(0,0,0,0.8)]"></div>


          {/* Balance */}
          <div className="text-center space-y-2">
            <h3 className="text-4xl font-bold">
              <span className="text-white text-4xl">
                 SepoliaETH</span>
                <br />
                <br />

          <p className="text-white text-xl mx-[-160px] font-sans">
            {/* ETH Address */}
          </p>
            </h3>
          </div>

          <br />
          <br />


          <div className="flex justify-center grid-cols-4 gap-2">
            <button
              className="bg-blue-600 text-white px-10 py-4 rounded-xl text-xl font-semibold"
            >
              Send
            </button>
            <button
              className="bg-blue-600 text-white px-5 py-4 rounded-xl text-xl mx-4 font-semibold"
            >
              Check Txns
            </button>
          </div>

          <br />
          <br />
          <br />

          <div>
            <button className="text-blue-400 font-medium text-2xl ">
              Activity
            </button>
            <div className="w-[250px] h-1 bg-blue-400 mt-1"></div>

            <div className="bg-customDark2 w-[950px] h-[120px] mx-[5px] my-4 border border-white rounded-lg p-4">
              <div className="flex">
                <p className="text-white my-2 text-3xl font-medium">
                  Transaction 0:{" "}
                </p>
                <p className="text-white my-2 text-3xl mx-4 font-serif">
                  0x728692C4936c2b6e24300dda3190B123A669EDb3
                </p>
              </div>
              <p className="text-green-600 text-2xl">Confirmed</p>
            </div>

            <div className="bg-customDark2 w-[950px] h-[120px] mx-[5px] my-4 border border-white rounded-lg p-4">
              <div className="flex">
                <p className="text-white my-2 text-3xl font-medium">
                  Transaction 0:{" "}
                </p>
                <p className="text-white my-2 text-3xl mx-4 font-serif">
                  0x728692C4936c2b6e24300dda3190B123A669EDb3
                </p>
              </div>
              <p className="text-red-600 text-2xl">Error</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendTxn;
