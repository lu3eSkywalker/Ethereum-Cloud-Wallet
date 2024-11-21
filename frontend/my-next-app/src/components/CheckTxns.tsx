import React from "react";
import { useSelector } from "react-redux";
import {RootState} from "../store/store";

interface Status {
  data: {
    result: {
      status: string;
    };
  };
}

const CheckTxns = ({ onClose }: any) => {
  const txHashArray = useSelector(
    (state: RootState) => state.transactions.txHashArray
  )

  const statusArray = useSelector(
    (state: RootState) => state.transactions.statusArray
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-customDark2 w-[1300px] h-[1000px] p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-center">
          <p className="text-white font-semibold text-3xl">Txns</p>
        </div>

        <br />

        <div className="overflow-y-auto h-[800px]">

          {txHashArray.map((data, index) => (
            <div className="bg-customDark2 w-[1200px] h-[150px] mx-[5px] my-4 border border-white rounded-lg p-4">
              <div className="flex">
                <p className="text-white my-2 text-2xl font-bold">
                  Transaction {index}:
                </p>
                <p className="text-white my-2 text-3xl mx-4 font-serif">
                  {data}
                </p>
              </div>

              {statusArray[index]?.data.result.status === "0x1" ? (
                <p className="text-green-600 text-2xl">Confirmed</p>
              ) : (
                <p className="text-red-600 text-2xl">Error</p>
              )}
            </div>
          ))}
        </div>

        <br />
        <br />

        <button 
          className="border-2 rounded-3xl px-8 py-3 text-cyan-600 font-semibold text-lg hover:bg-gray-100" 
          onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CheckTxns;
