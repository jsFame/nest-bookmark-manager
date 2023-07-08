import { ForbiddenException, Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { AuthDto } from "./dto"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import * as argon from "argon2"

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password)

    const count = await this.prisma.user.count()

    try {
      const user = await this.prisma.user.create({
        data: {
          id: count + 1,
          email: dto.email,
          hash: hash,
        },
        select: {
          //FIXME: use transformers
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      return user
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error({
          code: error.code,
        })
        if (error.code == "P2002") {
          throw new ForbiddenException("credentials taken")
        }
      }
      throw new ForbiddenException("credentials taken")
      throw error
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (!user) throw new ForbiddenException("incorrect credentials")

    const pwMatches = await argon.verify(user.hash, dto.password)

    if (!pwMatches) throw new ForbiddenException("invalid credentials")

    delete user.hash

    return user
  }
}
