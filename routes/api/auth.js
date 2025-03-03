const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, isValidId , upload} = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login)

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/:id/subscription",
  authenticate,
  isValidId,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
