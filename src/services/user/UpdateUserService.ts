import prismaClient from "../../prisma";

interface UserRequest {
  user_id: string;
  name: string;
  endereco: string;
}

class UpdateUserService {
  async execute({ user_id, name, endereco }: UserRequest) {

    try {

      const userAlreadyExiste = await prismaClient.user.findFirst({
        where: {
          id: user_id,
        }
      })

      if (!userAlreadyExiste) {
        throw new Error("User not existe!");
      }

      const userUpdated = await prismaClient.user.update({
        where: {
          id: user_id
        },
        data: {
          name,
          endereco
        },
        select: {
          name: true,
          email: true,
          endereco: true,
        }
      })

      return userUpdated;

    } catch (error) {
      throw new Error("Error an update the user");
    }

  }
}

export { UpdateUserService }