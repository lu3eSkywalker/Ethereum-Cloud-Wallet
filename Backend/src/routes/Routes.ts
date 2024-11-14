import express from 'express';
import { getPrivateKey, Signup } from '../controllers/Signup';
import { login, signMessage } from '../controllers/Login';
import { getStatusByTxHash, sendTxn } from '../controllers/Txns';

const router: express.Router = express.Router();

const app = express();

router.post("/signup", Signup);
router.post("/privateKey", getPrivateKey);
router.post("/login", login);
router.post("/signtxs", signMessage);
router.post("/sendtxn", sendTxn);


router.get("/getstatus/:id", getStatusByTxHash);

export default router;