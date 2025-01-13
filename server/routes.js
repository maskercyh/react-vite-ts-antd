import express from "express";
import { account, logout, info } from "./user.js";
import errorReportHandle from "./log.js";

const router = express.Router();

router.post("/api/login/account", account);
router.post("/api/user/logout", logout);
router.post("/api/user/info", info);
router.post("/api/errorReportHandle", errorReportHandle);

export default router;
