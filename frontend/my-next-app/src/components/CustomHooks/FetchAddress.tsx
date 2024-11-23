import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useFetchAddress = () => {
  const [ethAddress, setEthAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios(
          `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/getinfo`,
          {
            withCredentials: true,
          }
        );

        setEthAddress(response.data.data.ethereumAddress);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.log(
              "This is the endpoint to get redirected to when no cookie: ",
              error.response.data.redirect
            );
            router.push(`${error.response.data.redirect}`);
          }
        } else {
          console.log("An unexpected error occurred: ", error);
        }
      } finally {
        setLoading(false);
      }
    }
    getData();
  });

  if (loading && !ethAddress) {
    return null;
  }

  return ethAddress;
};

export default useFetchAddress;
