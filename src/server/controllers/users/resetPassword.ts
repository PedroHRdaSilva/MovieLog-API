import { Request, Response } from "express";
import { prisma } from "../../database/prisma/prisma";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

type ResetPasswordTokenPayload = {
  user: {
    userId: string;
    email: string;
  };
};
export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  const tokenPayload = jwt.decode(token) as ResetPasswordTokenPayload;

  if (!tokenPayload || typeof tokenPayload !== "object") {
    return null;
  }

  if (tokenPayload.user && !tokenPayload.user.userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: tokenPayload.user.userId },
  });

  if (
    !user ||
    user.email !== tokenPayload.user.email ||
    user.passwordResetToken !== token ||
    !user.passwordResetExpires
  ) {
    return null;
  }

  if (user.passwordResetExpires < new Date()) {
    throw new Error("Token expired");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  });
  return res.status(200).json(true);
};
