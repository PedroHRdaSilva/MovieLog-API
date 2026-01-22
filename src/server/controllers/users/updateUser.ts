import { Request, Response } from "express";
import { prisma } from "../../database/prisma/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, email, photo } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      return res.status(404).json({
        message: "Usuário não cadastrado",
      });
    }

    let hashedPassword = userExists.password;

    if (password) {
      const salt = await bcrypt.genSalt(12);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
        photo,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "Email já está em uso",
        });
      }
    }

    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};
