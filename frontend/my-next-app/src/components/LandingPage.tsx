import Image from "next/image";
import React, { useState } from "react";

const LandingPage = () => {
  const [mobileButton, setMobileButton] = useState<boolean>(false);
  const [extensionButton, setExtensionButton] = useState<boolean>(true);

  return (
    <div className="bg-customDark3 min-h-screen">
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="flex justify-center">
        <div className="bg-sharpBlue w-[1300px] h-[300px] p-6 rounded-3xl shadow-lg mx-4 ">
          <p className="text-white font-bold text-[50px] font-mono my-[20px] mx-[80px]">
            Ethereum Wallet
          </p>

          <p className="text-xl text-white mx-[80px]">
            Looking for a safe cloud Wallet to do send ethereum?
          </p>
          <p className="text-xl text-white mx-[80px]">
            Join this Cloud Wallet today!!
          </p>
        </div>
      </div>

      <br />
      <br />

      <div className="flex justify-center">
        {/* Two Boxes */}

        <div className="w-[600px] h-[500px] bg-greyIshBlack rounded-3xl shadow-lg p-6 space-y-6 my-[40px] mx-[15px]">
          <br />

          <div>
            <p className="text-white font-sans text-2xl font-bold mx-[40px]">
              How To Use Cloud Wallets
            </p>
            <br />
            <br />
            <p className="text-white text-xl mx-[40px]">
              1: SignUp Using Email
            </p>
            <p className="text-white text-xl mx-[40px]">
              1: Login Using the Credentials
            </p>{" "}
            <p className="text-white text-xl mx-[40px]">
              1: Simply do the transactions
            </p>
          </div>

          <br />

          <div className="mx-5">
            <div className="border-slate-400 border w-[370px] h-[90px] rounded-full">
              <button
                className={`${
                  mobileButton
                    ? "rounded-full bg-green-400 text-black text-xl py-5 px-10 mx-3 my-[10px] font-semibold"
                    : "rounded-full text-white text-xl py-5 px-10 mx-3 my-[10px] font-semibold"
                }`}
                onClick={() => {
                  setMobileButton(true);
                  setExtensionButton(false);
                }}
              >
                Mobile
              </button>
              <button
                className={`${
                  extensionButton
                    ? "rounded-full bg-green-400 text-black text-xl py-5 px-10 mx-3 my-[10px] font-semibold"
                    : "rounded-full text-white text-xl py-5 px-10 mx-3 my-[10px] font-semibold"
                }`}
                onClick={() => {
                  setExtensionButton(true);
                  setMobileButton(false);
                }}
              >
                Extension
              </button>
            </div>

            <div className="">
              <button className="text-black my-[30px] mx-[20px] text-xl font-medium bg-green-400 py-5 px-10 rounded-full">
                {mobileButton ? "Download Mobile App" : "Download Extension"}
              </button>
            </div>
          </div>
        </div>

        <div className="w-[600px] h-[500px] bg-greyIshBlack rounded-3xl shadow-lg p-6 space-y-6 my-[40px]">
          <br />

          <div>
            <Image
              src={
                "https://imgs.search.brave.com/Gz3nr-4ptve1uDt6B0cwF3Gc5r4KFWScGctsc60LXFA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/YmZvMTc5OGRsbzd6/LnBuZz93aWR0aD02/NDAmY3JvcD1zbWFy/dCZhdXRvPXdlYnAm/cz1iNjNmOTg0MGY5/NjFmOTJhY2UzMTY5/YjE5MTA4NWVlN2Zj/NWFmOTAx"
              }
              width={200}
              height={200}
              alt="ETH Logo"
              className="w-[250px] mx-[150px]"
            />
          </div>
        </div>
      </div>

      <br />
      <br />

      {/* Four Boxes */}

      <div className="flex justify-center">
        <div className="w-[360px] h-[600px] bg-greyIshBlack rounded-3xl shadow-lg p-6 space-y-6 my-[40px] mx-[20px]">
          <div>
            <p className="text-white font-sans text-4xl font-bold mx-[40px]">
              How To Use Cloud Wallets
            </p>
            <br />
            <br />
            <p className="text-white text-lg mx-[40px]">
              1: SignUp Using Email
            </p>
            <p className="text-white text-lg mx-[40px]">
              1: Login Using the Credentials
            </p>{" "}
            <p className="text-white text-lg mx-[40px]">
              1: Simply do the transactions
            </p>
          </div>
          <div>
            <Image
              src={
                "https://trustwallet.com/_next/static/media/raw.0f6f6e6d.svg"
              }
              width={300}
              height={300}
              alt="Image"
              className="mx-2 my-5"
            />
          </div>
        </div>

        <div className="w-[360px] h-[600px] bg-greyIshBlack rounded-3xl shadow-lg p-6 space-y-6 my-[40px] mx-[20px]">
          <div>
            <p className="text-white font-sans text-4xl font-bold mx-[40px]">
              How To Use Cloud Wallets
            </p>
            <br />
            <br />
            <p className="text-white text-lg mx-[40px]">
              1: SignUp Using Email
            </p>
            <p className="text-white text-lg mx-[40px]">
              1: Login Using the Credentials
            </p>{" "}
            <p className="text-white text-lg mx-[40px]">
              1: Simply do the transactions
            </p>
          </div>

          <div>
            <Image
              src={
                "https://trustwallet.com/_next/static/media/raw.7a06cf07.svg"
              }
              width={250}
              height={250}
              alt="Image"
              className="mx-8 my-3"
            />
          </div>
        </div>

        <div className="w-[360px] h-[600px] bg-greyIshBlack rounded-3xl shadow-lg p-6 space-y-6 my-[40px] mx-[20px]">
          <div>
            <p className="text-white font-sans text-4xl font-bold mx-[40px]">
              How To Use Cloud Wallets
            </p>
            <br />
            <br />
            <p className="text-white text-lg mx-[40px]">
              1: SignUp Using Email
            </p>
            <p className="text-white text-lg mx-[40px]">
              1: Login Using the Credentials
            </p>{" "}
            <p className="text-white text-lg mx-[40px]">
              1: Simply do the transactions
            </p>
          </div>

          <div>
            <Image
              src={
                "https://trustwallet.com/_next/static/media/raw.0f6f6e6d.svg"
              }
              width={300}
              height={300}
              alt="Image"
              className="mx-2 my-5"
            />
          </div>
        </div>

        <div className="w-[360px] h-[600px] bg-greyIshBlack rounded-3xl shadow-lg p-6 space-y-6 my-[40px] mx-[20px]">
          <div>
            <p className="text-white font-sans text-4xl font-bold mx-[40px]">
              How To Use Cloud Wallets
            </p>
            <br />
            <br />
            <p className="text-white text-lg mx-[40px]">
              1: SignUp Using Email
            </p>
            <p className="text-white text-lg mx-[40px]">
              1: Login Using the Credentials
            </p>{" "}
            <p className="text-white text-lg mx-[40px]">
              1: Simply do the transactions
            </p>
          </div>

          <div>
            <Image
              src={
                "https://trustwallet.com/_next/static/media/raw.16e2b8fb.svg"
              }
              width={200}
              height={200}
              alt="Image"
              className="mx-9 my-5"
            />
          </div>
        </div>
      </div>

      {/* Some Details about the wallet */}

      <br />
      <br />

      <div>
        <div className="flex justify-center">
          <div className="text-[70px] font-serif text-white">
            <p>How This Wallet is more Secure</p>
          </div>
        </div>

        <div className="flex justify-center">
          <p className="text-white text-[25px]">
            This wallet uses a method called Shamirs Secret Sharing to store
            your private keys securely. Your private key is split into multiple
            parts,
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <p className="text-white text-[25px]">
            ensuring it remains safe and only accessible to you. Even if one
            part is compromised, the full key remains protected, offering you
            enhanced security.
          </p>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <br />
      <br />

      <div className="flex justify-center">
        <div className="bg-footerBg w-[1500px] h-[800px] p-6 rounded-3xl shadow-lg ">
          <div className="flex">
            <div>
              <br />
              <br />

              <div className="mx-8">
                <p className="text-green-400 text-[80px] font-serif font-bold">
                  ETH Wallet
                </p>
                <Image
                  src={
                    "https://imgs.search.brave.com/Gz3nr-4ptve1uDt6B0cwF3Gc5r4KFWScGctsc60LXFA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/YmZvMTc5OGRsbzd6/LnBuZz93aWR0aD02/NDAmY3JvcD1zbWFy/dCZhdXRvPXdlYnAm/cz1iNjNmOTg0MGY5/NjFmOTJhY2UzMTY5/YjE5MTA4NWVlN2Zj/NWFmOTAx"
                  }
                  width={150}
                  height={150}
                  alt="ETH Logo"
                  className="w-[250px]"
                />
              </div>
            </div>

            <div className="mx-[110px] my-[70px]">
              <p className="text-white text-2xl font-bold">Wallet</p>
              <p className="text-white text-xl my-4">Mobile App</p>
              <p className="text-white text-xl my-4">Browser Extension</p>

              <div className="mt-[300px]">
                <p className="text-white font-bold text-lg whitespace-nowrap">
                  Download Cloud Wallet
                </p>
              </div>
            </div>

            <div className="my-[70px]">
              <p className="text-white text-2xl font-bold">Swaps</p>
              <p className="text-white text-xl my-4">Staking</p>
              <p className="text-white text-xl my-4">NFTs</p>
              <p className="text-white text-xl my-4">Security</p>
              <p className="text-white text-xl my-4">
                SWIFT: Smart Contract Wallet
              </p>
              <p className="text-white text-xl my-4">Features</p>
              <p className="text-white text-xl my-4">Buy Crypto</p>
            </div>

            <div className="mx-[110px] my-[70px]">
              <p className="text-white text-2xl font-bold">Build</p>
              <p className="text-white text-xl my-4">Developer Docs</p>
              <p className="text-white text-xl my-4">Wallet Core</p>
              <p className="text-white text-xl my-4">Submit dApp</p>
              <p className="text-white text-xl my-4">Get assets listed</p>
            </div>

            <div className="my-[70px]">
              <p className="text-white text-2xl font-bold">Support</p>
              <p className="text-white text-xl my-4">FAQ</p>
              <p className="text-white text-xl my-4">Community Forum</p>
              <p className="text-white text-xl my-4">Contact Us</p>
            </div>
          </div>

          <br />


          <div className="mx-[440px] my-[-200px]">
            <div className="whitespace-nowrap">
              <button className="text-green-400 border mx-4 border-green-400 bg-footerBg my-[30px] text-lg font-medium py-5 px-10 rounded-full hover:bg-green-400 hover:text-black">
                Download For IOS
              </button>

              <button className="text-green-400 border border-green-400 my-[30px] text-lg font-medium py-5 px-10 rounded-full hover:bg-green-400 hover:text-black">
                Download Extension
              </button>
            </div>

            <div>
              <button className="text-green-400 border border-green-400 mx-4 text-lg font-medium py-5 px-10 rounded-full hover:bg-green-400 hover:text-black">
                Download APK
              </button>

              <button className="text-green-400 border border-green-400 text-lg font-medium py-5 px-10 rounded-full hover:bg-green-400 hover:text-black">
                Download For Android
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default LandingPage;
