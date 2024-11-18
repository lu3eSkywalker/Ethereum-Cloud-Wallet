import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useFetchDetails from './FetchAddress';

const useFetchBalance = () => {

   const [ethBalance, setEthBalance] = useState<String>("");

   const ethAddress = useFetchDetails();

  //  console.log("This should run first: ", ethAddress);

   if(ethAddress === null) {
    // console.log("eth Address is null. So, returning")
    return;
   }

   const payload = {
    "id": 1,
    "jsonrpc": "2.0",
    "params": [
      `${ethAddress}`,
      "latest"
    ],
    "method": "eth_getBalance"
  }
   async function getBalance() {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_RPC_URL}`, payload);

      // console.log(response);
      // console.log("The Balance is: ", response.data.result);

      setEthBalance(response.data.result);
    }
    catch(error) {
      console.log("Error: ", error);
    }
   }

  getBalance();

   return ethBalance;
}

export default useFetchBalance;