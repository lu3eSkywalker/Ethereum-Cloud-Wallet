import express from 'express';
import { getPrivateKey, Signup } from '../controllers/Signup';
import { login, signMessage } from '../controllers/Login';
import { GetAllTxnsHashes, getStatusByTxHash, sendTxn } from '../controllers/Txns';
import { getPublicKeyAndAddress } from '../controllers/GetInfo';
import { Authenticate } from '../middleware/Authorization';

const router: express.Router = express.Router();

const app = express();

router.post("/signup", Signup);
router.post("/privateKey", Authenticate, getPrivateKey);
router.post("/login", login);
router.post("/signtxs", signMessage);
router.post("/sendtxn", Authenticate, sendTxn);

router.get("/getstatus/:id", Authenticate, getStatusByTxHash);
router.get("/getinfo", Authenticate, getPublicKeyAndAddress);
router.get("/getalltxnhash", Authenticate ,GetAllTxnsHashes);

export default router;