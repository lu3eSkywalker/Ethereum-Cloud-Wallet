import axios from 'axios';
import { useState } from 'react'
import useFetchDetails from './FetchAddress';

const useFetchBalance = () => {

   const [ethBalance, setEthBalance] = useState<string>("");

   const ethAddress = useFetchDetails();

   if(ethAddress === null) {
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