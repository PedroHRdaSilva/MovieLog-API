import { Router } from "express";
import { UsersController } from "../controllers";
import { validateUser } from "../shared/middlewares";
import { CreateUserSchema } from "../database/schemas/createUser.schema";

const router = Router();
console.log("🧭 routes carregadas");
router.post(
  "/user",
  //validar no middlewars , Middleware valida, controller executa.
  validateUser(CreateUserSchema),
  UsersController.createUser,
);

router.post("/forgotPassword", UsersController.forgotPassword);

router.post("/resetPassword/:token", UsersController.resetPassword);

router.post("/updateUser/:id", UsersController.updateUser);

export { router };
