import { Request, Response } from "express";
import { prisma } from "../../database/prisma/prisma";
import { sendEmail } from "../../resend";

import jwt from "jsonwebtoken";
import forgotPasswordEmail from "../../../email/forgotPasswordEmail";

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "Usuário não cadastrado" });
  }
  const payload = {
    userId: user.id,
    email: user.email,
  };

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não definido");
  }

  const resetPasswordToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const experiedDate = new Date(Date.now() + 6 * 60 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetExpires: experiedDate,
      passwordResetToken: resetPasswordToken,
    },
  });
  console.log("chegou aqui");
  await sendEmail({
    to: user.email,
    subject: "Redefinição de senha",
    react: forgotPasswordEmail({
      name: user.name,
      resetPasswordToken: resetPasswordToken,
    }),
  });

  return res.status(200).json(true);
};
