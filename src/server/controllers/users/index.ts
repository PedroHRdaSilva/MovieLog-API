import * as createUser from "./createUser";
import * as forgotPassword from "./forgotPassword";
import * as resetPassword from "./resetPassword";
import * as updateUser from "./updateUser";

export const UsersController = {
  ...createUser,
  ...forgotPassword,
  ...resetPassword,
  ...updateUser,
};
