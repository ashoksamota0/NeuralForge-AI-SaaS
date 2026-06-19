// import express from "express";
// import { auth } from "../middlewares/auth.js";
// import {
//   getPublishedCreations,
//   getUserCreations,
//   toggleLikeCreation,
//   upgradeToPremium,
// } from "../controllers/userController.js";

// const userRouter = express.Router();

// userRouter.get("/get-user-creations", auth, getUserCreations);
// userRouter.get("/get-published-creations", auth, getPublishedCreations);
// userRouter.post("/toggle-like-creation", auth, toggleLikeCreation);
// userRouter.post("/upgrade-to-premium", auth, upgradeToPremium);

// export default userRouter;

import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  getPublishedCreations,
  getUserCreations,
  toggleLikeCreation,
  upgradeToPremium,
  newsletterSubscribe,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/get-user-creations", auth, getUserCreations);
userRouter.get("/get-published-creations", auth, getPublishedCreations);
userRouter.post("/toggle-like-creation", auth, toggleLikeCreation);
userRouter.post("/upgrade-to-premium", auth, upgradeToPremium);
userRouter.post("/newsletter-subscribe", newsletterSubscribe); // no auth — public route

export default userRouter;
