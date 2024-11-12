import express from 'express';
import { getPrivateKey, Signup } from '../controllers/Signup';
import { login, signTxns } from '../controllers/Login';

const router: express.Router = express.Router();

const app = express();

router.post("/signup", Signup);
router.post("/privateKey", getPrivateKey);
router.post("/login", login);
router.post("/signtxs", signTxns);

export default router;