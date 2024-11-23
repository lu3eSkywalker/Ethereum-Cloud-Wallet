import axios from "axios";
import React, { useEffect, useState } from "react";
import { hexToNumber, hexToEth } from "../Utils/EthConvertor";

interface TransactionData {
  result: {
    nonce: string;
    maxFeePerGas: string;
    value: string;
    from: string;
    to: string;
    chainId: string;
    status: string;
    gasPrice: string;
    blockNumber: string;
  };
}

interface CheckDetailsProp {
  onClose: () => void,
  data: string
}

const CheckTxnsDetails: React.FC<CheckDetailsProp> = ({ onClose, data }) => {
  const [transactionData, setTransactionData] = useState<TransactionData>();

  async function getTxInfo() {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_RPC_URL}`, {
        id: 1,
        jsonrpc: "2.0",
        method: "eth_getTransactionByHash",
        params: [`${data}`],
      });

      const transaction = response?.data?.result;

      console.log("This is the fucking response: ", response);
      console.log("Searching in the tree: ", response?.data.result.value);
      setTransactionData({ result: transaction });
    } catch (error: unknown) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    getTxInfo();
  });

  console.log(
    "This is the fucking Transaction data: ",
    transactionData?.result.nonce
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-customDark2 w-[400px] h-[550px] p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-start">
          <p className="text-white font-semibold text-3xl">Txns</p>
          <div className="flex justify-end mx-[230px]">
            <button
              className="border-2 rounded-3xl px-4 py-2 text-cyan-600 font-semibold text-sm hover:bg-gray-100"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
        <br />

        <div className="overflow-y-auto h-[800px]">
          <br />

          <div className="flex justify-between w-full my-4">
            <p className="text-white font-bold">From</p>
            <p className="text-white font-bold text-xs my-[4px]">
              {transactionData?.result.from}
            </p>
          </div>

          <div className="flex justify-between w-full my-4">
            <p className="text-white font-bold">To</p>
            <p className="text-white font-bold text-xs my-[4px]">
              {transactionData?.result.to}
            </p>
          </div>
          <div>
            <p className="text-white font-bold">Transaction</p>

            <div className="flex justify-between w-full my-2">
              <p className="text-white text-sm">Nonce</p>
              <p className="text-white text-sm">
                {hexToNumber(transactionData?.result?.nonce)}
              </p>
            </div>

            <div className="flex justify-between w-full my-2">
              <p className="text-white text-sm">Amount</p>
              <p className="text-white font-bold text-sm">
                {hexToEth(transactionData?.result?.value)}
              </p>
            </div>

            <div className="flex justify-between w-full my-2">
              <p className="text-white text-sm">ChainId: </p>
              <p className="text-white text-sm">
                {hexToNumber(transactionData?.result.chainId)}
              </p>
            </div>

            <div className="flex justify-between w-full my-2">
              <p className="text-white text-sm">Max Gas Per Fee: </p>
              <p className="text-white text-sm">
                {hexToEth(transactionData?.result.maxFeePerGas)}
              </p>
            </div>

            <div className="flex justify-between w-full my-2">
              <p className="text-white text-sm">gas: </p>
              <p className="text-white text-sm">
                {hexToEth(transactionData?.result.gasPrice)}
              </p>
            </div>

            <div className="flex justify-between w-full my-2">
              <p className="text-white text-sm">gasPrice: </p>
              <p className="text-white text-sm">
                {hexToEth(transactionData?.result.gasPrice)}
              </p>
            </div>

            <div className="flex justify-between w-full my-2">
              <p className="text-white text-sm">blocknumber: </p>
              <p className="text-white text-sm">
                {hexToNumber(transactionData?.result.blockNumber)}
              </p>
            </div>
          </div>

          <br />
          <br />

          <div>
            <p className="text-white font-bold">Activity Log</p>
          </div>
        </div>

        <br />
        <br />
      </div>
    </div>
  );
};

export default CheckTxnsDetails;
