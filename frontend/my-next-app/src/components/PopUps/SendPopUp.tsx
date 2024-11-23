import React, { useEffect, useState } from "react";
import axios from "axios";
import useFetchAddress from "../CustomHooks/FetchAddress";

interface SendEthProp {
  onClose: () => void
}

const SendPopUp: React.FC<SendEthProp> = ({ onClose }) => {
  const ethAddress = useFetchAddress();

  useEffect(() => {
    console.log("Eth Address:", ethAddress);
  }, [ethAddress]);

  const [toSendEthAddress, setToSendEthAddress] = useState<string>("");
  const [valueOfEthToSend, setValueOfEthToSend] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [txResponse, setTxResponse] = useState<string>("");

  async function sendTxns() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/sendtxn`,
        {
          toAddress: toSendEthAddress,
          valueEthToSend: valueOfEthToSend,
        },
        {
          withCredentials: true,
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log(response);
      console.log(response.data);
      console.log("This is the success object: ", response.data.success);

      if (response.data.success === true) {
        setTxResponse("Tx SuccessFull");
      } else {
        setTxResponse("Tx Failed");
      }
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
              {ethAddress}
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
            onChange={(e) => setToSendEthAddress(e.target.value)}
          />
          <input
            type="text"
            className="rounded-lg bg-customDark2 w-[550px] h-[75px] border border-white mx-[5px] my-4 px-5 text-2xl text-white"
            placeholder="Value of ETH to send"
            onChange={(e) => setValueOfEthToSend(e.target.value)}
          />
        </div>

        <br />

        {loading ? (
          <div className="flex justify-center bg-slate-400 w-[350px] mx-[100px]">
            <progress className="progress progress-accent w-70 "></progress>
          </div>
        ) : (
          <p></p>
        )}

        <p
          className={`${
            txResponse === "Tx SuccessFull"
              ? "text-green-400 text-2xl font-semibold flex justify-center"
              : "text-red-500 text-2xl font-semibold flex justify-center"
          }`}
        >
          {txResponse}
        </p>

        <br />

        <div className="flex justify-center mt-8 space-x-8">
          <button
            className="border-2 rounded-3xl px-8 py-3 text-cyan-600 font-semibold text-lg hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={() => sendTxns()}
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
