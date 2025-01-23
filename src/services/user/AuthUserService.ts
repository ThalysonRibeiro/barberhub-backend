import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthUserRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async executa({ email, password }: AuthUserRequest) {

    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      },
      include: {
        subscripitons: true,
      }
    })

    if (!user) {
      throw new Error("Emal/passorwd incorrect");
    }

    const passeordMath = await compare(password, user?.password);

    if (!passeordMath) {
      throw new Error("Email/password incorrect");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    )

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      endereco: user?.endereco,
      token: token,
      subscripitons: user.subscripitons ? {
        id: user?.subscripitons?.id,
        status: user?.subscripitons?.status
      } : null
    }
  }
}

export { AuthUserService };