import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import SendPopUp from "./PopUps/SendPopUp";
import { useRouter } from "next/router";
import CheckTxnsDetails from "./PopUps/CheckTxnsDetails";
import Navbar from "./Design/Navbar";
import { convertHexToWeiToEth } from "./Utils/EthConvertor";
import useFetchAddress from "./CustomHooks/FetchAddress";
import useFetchBalance from "./CustomHooks/FetchBalance";
import CheckLogin from "./Utils/CheckLogin";

interface StatusArray {
  data: {
    result: {
      status: string;
    };
  };
}

interface TransactionValueArray {
  data: {
    result: {
      hash: string;
      status: string;
      value: string;
    };
  };
}

interface TransactionValueArray2 {
  result: {
    hash: string;
    status: string;
    value: string;
  };
}

const SendTxn = () => {
  const [showSendPopUp, setSendShowPopUp] = useState(false);
  const [showTxnDetailPopUp, setShowTxnDetailPopUp] = useState(false);
  const [dataForPopUp, setDataForPopUp] = useState<string>("");
  const [txHashArray, setTxHashArray] = useState<string[]>([]);
  const [statusArray, setStatusArray] = useState<StatusArray[]>([]);

  const [txHashArrayEmpty, setTxHashArrayEmpty] = useState<boolean>(false);

  const [transactionValueArray, setTransactionValueArray] = useState<
    TransactionValueArray[]
  >([]);
  const [transactionValueArray2, setTransactionValueArray2] = useState<
    TransactionValueArray2[]
  >([]);

  const router = useRouter();

  const ethBalance = useFetchBalance();
  const ethAddress = useFetchAddress();
  const ethereumBalance = convertHexToWeiToEth(ethBalance);

  // This checks if the token is blacklisted or not
  CheckLogin();

  {
    /**
  First, We Will Get all the Users Tx Hashes and will put them in TxHashArray
  Then, We will Check the Status of all the transaction and put the response in statusArray
  */
  }

  async function checkTxns() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/getalltxnhash`,
        {
          withCredentials: true,
        }
      );

      if (response.data.data === null) {
        console.log("There is no data");
        setTxHashArrayEmpty(true);
        return;
      }
      setTxHashArray(response.data.data.txHash);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.log(
            "This is the catch block error: ",
            error.response.data.redirect
          );
          console.log(error);
          router.push(`${error.response.data.redirect}`);
        }
      } else {
        console.log("An unexpected error occurred:", error);
      }
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
      if (txHashArray.length === 0) {
        return;
      }

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

      console.log("This is the fucking response: ", response);
      setStatusArray(response);
      console.log(response);
    } catch (error: unknown) {
      console.log(error);
    }
  }

  {
    /**
    Then, we get the transaction Info using the txHashArray and put them in the state setTransactionValueArray
    Then, we take the data from transactionValueArray and put them into TransactionValueArray2
    (because it was showing some async error while rendering data directly using transactionValueArray)
    */
  }

  async function getTxInfo() {
    try {
      if (txHashArray.length === 0) {
        return;
      }

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

      console.log("This is the fucking response: ", response);
      console.log(response[0].data.result.value);
      setTransactionValueArray(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTxInfo();
  }, [txHashArray]);

  function putValuesInTransactionArray() {
    if (transactionValueArray.length < 0) {
      console.log("The Array is empty");
      return;
    }
    const newArray = transactionValueArray.map((txn) => txn?.data);
    setTransactionValueArray2(newArray);
  }

  useEffect(() => {
    putValuesInTransactionArray();
  }, [transactionValueArray]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="bg-customDark">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div
            className="w-[1100px] bg-customDark2 rounded-lg shadow-lg p-6 space-y-6 h-auto"
            style={{ minHeight: "calc(1000px + 400px)" }}
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
                Send ETH
              </button>
            </div>

            {showSendPopUp && (
              <SendPopUp onClose={() => setSendShowPopUp(false)} />
            )}

            {showTxnDetailPopUp && (
              <CheckTxnsDetails
                onClose={() => setShowTxnDetailPopUp(false)}
                data={dataForPopUp}
              />
            )}

            <br />
            <br />
            <br />

            <div>
              <button className="text-blue-400 font-medium text-xl ">
                Activity
              </button>
              <div className="w-[250px] h-1 bg-blue-400 mt-1"></div>

              {txHashArrayEmpty ? (
                <div>
                  <p className="text-white font-mono text-4xl my-[50px]">
                    No Transactions
                  </p>
                </div>
              ) : (
                <div></div>
              )}

              <div>
                {transactionValueArray2?.map((data, index: number) => (
                  <div
                    key={data?.result?.hash || index}
                    className="bg-customDark2 w-[1000px] h-[120px] mx-[5px] my-4 border-white rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <button
                          onClick={() => {
                            setDataForPopUp(data?.result?.hash);
                            setShowTxnDetailPopUp(true);
                          }}
                          className="text-white my-2 text-2xl font-serif"
                        >
                          Transaction {index}
                        </button>
                        <p>
                          {statusArray[index]?.data.result.status ? (
                            <p className="text-green-600 text-xl">Confirmed</p>
                          ) : (
                            <p className="text-red-600 text-xl">Error</p>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-white text-2xl mx-[-50px] font-serif">
                          {convertHexToWeiToEth(data?.result?.value)} SepoliaETH
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendTxn;
