import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import React from "react";

const CheckLogin = () => {
  const router = useRouter();
  async function checkToken() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/verify`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return <div></div>;
};

export default CheckLogin;