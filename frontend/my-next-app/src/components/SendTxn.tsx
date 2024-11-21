import axios from "axios";
import React, { useEffect, useState } from "react";
import SendPopUp from "./SendPopUp";
import CheckTxns from "./CheckTxns";
import useFetchBalance from "./FetchBalance";
import useFetchAddress from "./FetchAddress";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { setTxHashArray, setStatusArray } from "@/store/slices/txArraySlice";
import { useRouter } from "next/router";
import CheckTxnsDetails from "./CheckTxnsDetails";

const SendTxn = () => {
  const [showSendPopUp, setSendShowPopUp] = useState(false);
  const [showTxnsPopUp, setShowTxnsPopUp] = useState(false);
  const [showTxnDetailPopUp, setShowTxnDetailPopUp] = useState(false);
  const [dataForPopUp, setDataForPopUp] = useState("");

  const [transactionValueArray, setTransactionValueArray] = useState<any[]>([]);
  const [transactionValueArray2, setTransactionValueArray2] = useState<any[]>(
    []
  );

  const router = useRouter();

  // Redux Logic
  const dispatch = useDispatch<AppDispatch>();
  const txHashArray = useSelector(
    (state: RootState) => state.transactions.txHashArray
  );
  const statusArray = useSelector(
    (state: RootState) => state.transactions.statusArray
  );

  async function checkTxns() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/getalltxnhash`,
        {
          withCredentials: true,
        }
      );
      dispatch(setTxHashArray(response.data.data.txHash));
    } catch (error: any) {
      console.log(
        "This is the catch block error: ",
        error.response.data.redirect
      );
      console.log(error);
      router.push(`${error.response.data.redirect}`);
    }
  }

  useEffect(() => {
    checkTxns();
  }, []);

  useEffect(() => {
    checkStatus();
  }, [txHashArray]);

  async function checkStatus() {
    try {
      const response = await Promise.all(
        txHashArray.map(async (data) => {
          return await axios.post(`${process.env.NEXT_PUBLIC_RPC_URL}`, {
            id: 1,
            jsonrpc: "2.0",
            method: "eth_getTransactionReceipt",
            params: [`${data}`],
          });
        })
      );

      dispatch(setStatusArray(response));
    } catch (error) {
      console.log(error);
    }
  }

  // const anotherAnotherAnotherArray: any = [];

  async function getTxInfo() {
    try {
      const response = await Promise.all(
        txHashArray.map(async (data) => {
          return await axios.post(`${process.env.NEXT_PUBLIC_RPC_URL}`, {
            id: 1,
            jsonrpc: "2.0",
            method: "eth_getTransactionByHash",
            params: [`${data}`],
          });
        })
      );

      console.log(response);
      console.log(response[0].data.result.value);
      setTransactionValueArray(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTxInfo();
  }, [txHashArray]);

  const ethBalance = useFetchBalance();
  const ethAddress = useFetchAddress();

  const ethereumBalance = convertHexToWeiToEth(ethBalance);

  // Function to convert HEX to Wei To ETH
  function convertHexToWeiToEth(ethBalance: any) {
    const ethBalanceToString = ethBalance?.toString();
    if (ethBalanceToString === undefined) {
      return;
    }
    const stringToInt = parseInt(ethBalanceToString, 16);
    const weiToEth = stringToInt / 10 ** 18;
    const weiRounded = weiToEth.toFixed(7);
    return weiRounded;
  }

  function putValuesInTransactionArray() {
    if (transactionValueArray.length < 0) {
      console.log("The Array is empty");
      return;
    }
    // const newArray = transactionValueArray.slice(0, 5).map((txn) => convertHexToWeiToEth(txn?.data?.result?.value));
    const newArray = transactionValueArray.slice(0, 5).map((txn) => txn?.data);
    setTransactionValueArray2(newArray);
    console.log("This is the fucking array: ", transactionValueArray2);
  }

  useEffect(() => {
    putValuesInTransactionArray();
  }, [transactionValueArray])

  return (
    <div className="bg-customDark">
      <div className="min-h-screen flex items-center justify-center p-6">
        <div
          className="w-[1100px] bg-customDark2 rounded-lg shadow-lg p-6 space-y-6"
          style={{ height: "calc(1000px + 400px)" }}
        >
          <div className="flex">
            <div className="bg-black text-white font-medium text-xl rounded-full w-[120px] h-[40px] flex items-center justify-center">
              Sepolia
            </div>
            <div className="text-white mx-[370px] text-2xl my-2 font-semibold">
              Welcome!!
              <br />
            </div>
          </div>

          <div className="w-full border-t border-black shadow-[0_5px_15px_rgba(0,0,0,0.8)]"></div>

          {/* Balance */}
          <div className="text-center space-y-2">
            <h3 className="text-4xl font-bold">
              <span className="text-white text-3xl">
                {ethereumBalance} SepoliaETH
              </span>
              <br />
              <br />

              <p className="text-white text-xl mx-[-160px] font-sans">
                {ethAddress}
              </p>
            </h3>
          </div>

          <br />
          <br />

          <div className="flex justify-center grid-cols-4 gap-2">
            <button
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold"
              onClick={() => setSendShowPopUp(true)}
            >
              Send
            </button>

            <button
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold"
              onClick={() => setShowTxnDetailPopUp(true)}
            >
              Transaction
            </button>
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded-xl text-lg mx-4 font-semibold"
              onClick={() => setShowTxnsPopUp(true)}
            >
              Check Txns
            </button>
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded-xl text-lg mx-4 font-semibold"
              onClick={() => putValuesInTransactionArray()}
            >
              PutValuesInTransactionArray
            </button>
          </div>

          {showSendPopUp && (
            <SendPopUp onClose={() => setSendShowPopUp(false)} />
          )}

          {showTxnsPopUp && (
            <CheckTxns onClose={() => setShowTxnsPopUp(false)} />
          )}

          {showTxnDetailPopUp && (
            <CheckTxnsDetails onClose={() => setShowTxnDetailPopUp(false)} data={dataForPopUp} />
          )}

          <br />
          <br />
          <br />

          <div>
            <button className="text-blue-400 font-medium text-xl ">
              Activity
            </button>
            <div className="w-[250px] h-1 bg-blue-400 mt-1"></div>

            {transactionValueArray2?.map((data: any, index: number) => (
              <div className="bg-customDark2 w-[1000px] h-[120px] mx-[5px] my-4 border-white rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <button
                      onClick={() => {
                        setDataForPopUp(data?.result?.hash)
                        setShowTxnDetailPopUp(true)
                      }}
                      className="text-white my-2 text-2xl font-serif"
                    >
                      Transaction {index}
                    </button>
                    <p className="text-green-600 text-xl">Confirmed</p>
                  </div>
                  <div>
                    <p className="text-white text-2xl mx-[-50px] font-serif">
                      {convertHexToWeiToEth(data?.result?.value)} SepoliaETH
                      {/* {data?.result?.value} */}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendTxn;