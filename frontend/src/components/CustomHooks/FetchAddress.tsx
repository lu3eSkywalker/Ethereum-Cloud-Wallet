import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetchAddress = () => {
  const [ethAddress, setEthAddress] = useState<String | null>( null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios(
          `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/getinfo`,
          {
            withCredentials: true,
          }
        );

        // console.log(response.data);
        // console.log("This is the ethereum address: ", response.data.data.ethereumAddress);
        setEthAddress(response.data.data.ethereumAddress);

      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  if(loading && !ethAddress) {
    return null;
  }

  return ethAddress;
};

export default useFetchAddress;
