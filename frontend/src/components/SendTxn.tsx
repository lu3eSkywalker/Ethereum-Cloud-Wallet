import axios from "axios";
import React, { useEffect, useState } from "react";
import useFetchBalance from "./FetchBalance";
import useFetchAddress from "./FetchAddress";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { setTxHashArray, setStatusArray } from "@/store/slices/txArraySlice";
import { useRouter } from "next/router";


const SendTxn = () => {

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
      console.log("This is the catch block error: ", error.response.data.redirect);
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

  const ethBalance = useFetchBalance();
  const ethAddress = useFetchAddress();

  const anotherArray: any = [];
  const anotherAnotherArray: any = [];

  // Converting the Hexdecimal ethBalance to string and then to int and then to eth
  const ethBalanceToString = ethBalance?.toString();
  if (ethBalanceToString === undefined) {
    return;
  }
  const stringToInt = parseInt(ethBalanceToString, 16);
  const weiToEth = stringToInt / 10 ** 18;
  const weiRounded = weiToEth.toFixed(7);

  function getAllHashes() {
    const arrayLength = txHashArray.length;

    if (txHashArray.length < 6) {
      for (let i = 0; i < arrayLength; i++) {
        anotherArray.push(txHashArray[i]);
      }

      for (let i = 0; i < arrayLength; i++) {
        anotherAnotherArray.push(statusArray[i]?.data.result.status);
      }
    } else {
      for (let i = 0; i < 6; i++) {
        anotherArray.push(txHashArray[i]);
      }

      for (let i = 0; i < 6; i++) {
        anotherAnotherArray.push(statusArray[i]?.data.result.status);
      }
    }
  }

  getAllHashes();

  return (
    <div className="bg-customDark">
      <div className="min-h-screen flex items-center justify-center p-6">
        {/* <div className="w-[1100px] h-[1000px] bg-customDark2 rounded-lg shadow-lg p-6 space-y-6"> */}

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
                {weiRounded} SepoliaETH
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

          <br />
          <br />
          <br />

          <div>
            <button className="text-blue-400 font-medium text-xl ">
              Activity
            </button>
            <div className="w-[250px] h-1 bg-blue-400 mt-1"></div>

            {anotherArray.map((data: any, index: number) => {
              const data1 = anotherAnotherArray[index];
              return (
                <div>
                  <div className="bg-customDark2 w-[1000px] h-[120px] mx-[5px] my-4 border border-white rounded-lg p-4">
                    <div className="flex">
                      <p className="text-white my-2 text-3xl font-medium"></p>
                      <p className="text-white my-2 text-2xl font-serif">
                        Transaction {index}: {data}
                      </p>
                    </div>
                    {data1 === "0x1" ? (
                      <p className="text-green-600 text-xl">Confirmed</p>
                    ) : (
                      <p className="text-red-600 text-xl">Error</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendTxn;
