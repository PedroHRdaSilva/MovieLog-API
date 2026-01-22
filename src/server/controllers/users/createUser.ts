// controllers/users/createUser.ts
import { Request, Response } from "express";
import { prisma } from "../../database/prisma/prisma";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(409).json({
        mensage: "Email já cadastrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isConnectedWithGoogle: false,
      },
    });

    return res.status(201).json(user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(500).json({
        message: "Erro ao criar usuário",
      });
    }
  }
};
