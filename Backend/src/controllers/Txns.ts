import { Request, Response } from "express";
import { z } from "zod";
import { ethers } from "ethers";
import { PrismaClient as PrismaClientDB } from "@prisma/client-db";
import { getPrivateKey } from "../middleware/GetPrivateKey";
const prisma = new PrismaClientDB();

const sendTxnSchema = z.object({
  toAddress: z.string(),
  valueEthToSend: z.string(),
});

export const sendTxn = async (req: Request, res: Response): Promise<void> => {
  const parsedInput = sendTxnSchema.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(401).json({
      success: false,
      message: "Invalid Inputs",
    });

    return;
  }

  const toAddress = parsedInput.data.toAddress;
  const ethValue = parsedInput.data.valueEthToSend;

  const jwtToken = req.header("Authorization");

  const sendToken = parseJwt(jwtToken);

  const userId = sendToken.id;

  const privateKey = await getPrivateKey(userId);

  const providers = new ethers.JsonRpcProvider(
    ""
  );

  // Sign a transaction
  const wallet = new ethers.Wallet(privateKey, providers);
  const ethAddress = wallet.getAddress();

  const publicKey = wallet.signingKey.publicKey;

  const ethValueToSend = ethers.parseUnits(ethValue, 18);

  const nonce = await wallet.getNonce();

  try {
    const sendTransaction = await wallet.sendTransaction({
      type: 2,
      to: toAddress, 
      from: ethAddress, 
      nonce: nonce,
      gasLimit: 21000,
      maxPriorityFeePerGas: 2000000000,
      maxFeePerGas: 20000000000,
      value: ethValueToSend,
      chainId: 11155111,
      data: "0x",
      accessList: [],
      blockTag: "latest", 
      enableCcipRead: false, 
      blobVersionedHashes: null,
      maxFeePerBlobGas: null,
      blobs: null,
      kzg: null,
    });

    const txHash = sendTransaction.hash;

    // Add the transaction hash in the array
    const userTxns = await prisma.transactionHash.findFirst({
      where: {
        userId: userId
      },
      select: {
        txHash: true,
        id: true
      }
    });


    if(userTxns) {
      const updatedArray = [...userTxns.txHash, txHash];

      await prisma.transactionHash.update({
        where: {
          id: userTxns.id
        },
        data: {
          txHash: updatedArray
        }
      })
    } else {
      await prisma.transactionHash.create({
        data: {
          userId: userId,
          txHash: [txHash]
        }
      })
    }

    console.log(txHash);

    const tx = await providers.getTransactionReceipt(txHash);
    const receipt = tx?.getResult;
    console.log(receipt);
  } catch (error) {
    res.status(511).json({
      success: false,
      message: "Error",
      Error: error,
    });
    console.log("Error: ", error);
  }
};

function parseJwt(token: any) {
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
}